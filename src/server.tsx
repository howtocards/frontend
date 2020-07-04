import { performance } from 'perf_hooks';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, MatchedRoute } from 'react-router-config';
import { ServerStyleSheet } from 'styled-components';

import { fork, serialize, allSettled, Scope } from 'effector/fork';
import { Event, forward, root, sample, Store } from 'effector-root';
import { getStart } from 'lib/effector';

import {
  setCookiesForRequest,
  $cookiesFromResponse,
  $cookiesForRequest,
} from 'api/request';
import { $lastPushed } from 'features/navigation';
import { readyToLoadSession, sessionLoaded } from 'features/session';

import { Application } from './application';
import { routes } from './pages/routes';

const serverStarted = root.createEvent<{
  req: express.Request;
  res: express.Response;
}>();

const requestHandled = serverStarted.map(({ req }) => req);

const cookiesReceived = requestHandled.filterMap(
  (request) => request.headers.cookie,
);

const routesMatched = requestHandled.map((request) =>
  matchRoutes(routes, request.url).filter(lookupStartEvent),
);

forward({
  from: cookiesReceived,
  to: setCookiesForRequest,
});

forward({
  from: serverStarted,
  to: readyToLoadSession,
});

for (const { component } of routes) {
  const startPageEvent = getStart(component);

  if (startPageEvent) {
    const matchedRoute = sample(routesMatched, sessionLoaded).filterMap(
      (routes) =>
        routes.filter((route) => lookupStartEvent(route) === startPageEvent)[0],
    );

    forward({
      from: matchedRoute.map((route) => route.match.params),
      to: startPageEvent,
    });
  }
}

sample({
  source: serverStarted,
  clock: $cookiesFromResponse,
  fn: ({ res }, cookies) => ({ res, cookies }),
}).watch(({ res, cookies }) => res.setHeader('Set-Cookie', cookies));

sample({
  source: serverStarted,
  clock: $lastPushed,
  fn: ({ res }, redirectUrl) => ({ res, redirectUrl }),
}).watch(({ res, redirectUrl }) => res.redirect(redirectUrl));

let assets: any;

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

export const server = express()
  .disable('x-powered-by')
  .use(
    '/api/v0',
    createProxyMiddleware({
      target: process.env.BACKEND_URL ?? 'http://localhost:9005',
      pathRewrite: {
        '^/api/v0': '',
      },
      secure: false,
    }),
  )
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .use(cookieParser())
  .get('/*', async (req: express.Request, res: express.Response) => {
    console.info('[REQUEST] %s %s', req.method, req.url);
    const timeStart = performance.now();
    const scope = fork(root);

    try {
      await allSettled(serverStarted, {
        scope,
        params: { req, res },
      });
    } catch (error) {
      console.log(error);
    }

    const context = {};
    const sheet = new ServerStyleSheet();

    const jsx = sheet.collectStyles(
      <StaticRouter context={context} location={req.url}>
        <Application root={scope} />
      </StaticRouter>,
    );

    if (isRedirected(res)) {
      cleanUp();
      console.info(
        '[REDIRECT] from %s to %s at %sms',
        req.url,
        res.get('Location'),
        (performance.now() - timeStart).toFixed(2),
      );
      return;
    }

    const stream = sheet.interleaveWithNodeStream(
      ReactDOMServer.renderToNodeStream(jsx),
    );

    const storesValues = customSerialize(scope, {
      ignore: [$cookiesForRequest, $cookiesFromResponse],
    });

    res.write(htmlStart(assets.client.css, assets.client.js));
    stream.pipe(res, { end: false });
    stream.on('end', () => {
      res.end(htmlEnd(storesValues));
      cleanUp();
      console.info(
        '[PERF] sent page at %sms',
        (performance.now() - timeStart).toFixed(2),
      );
    });

    function cleanUp() {
      sheet.seal();
    }
  });

function htmlStart(assetsCss: string, assetsJs: string) {
  return `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Howtocards</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assetsCss ? `<link rel="stylesheet" href="${assetsCss}">` : ''}
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assetsJs}" defer></script>`
              : `<script src="${assetsJs}" defer crossorigin></script>`
          }
    </head>
    <body>
        <div id="root">`;
}

function htmlEnd(storesValues: {}): string {
  return `</div>
        <script>
          window.INITIAL_STATE = ${JSON.stringify(storesValues)}
        </script>
    </body>
</html>`;
}

function lookupStartEvent<P>(
  match: MatchedRoute<P>,
): Event<Record<string, string>> | undefined {
  if (match.route.component) {
    return getStart(match.route.component);
  }
}

function isRedirected(res: express.Response): boolean {
  return res.statusCode >= 300 && res.statusCode < 400;
}

interface SerializeParams {
  ignore?: Array<Store<any>>;
}

// TODO: replace to `serialize(scope, { ignore: [] })`
function customSerialize(scope: Scope, { ignore = [] }: SerializeParams = {}) {
  const result = serialize(scope);
  for (const { sid } of ignore) {
    if (sid) delete result[sid];
  }
  return result;
}
