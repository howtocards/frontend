import { createBrowserHistory } from 'history';
import { createStore, createEvent, merge } from 'effector-root';

export const history =
  process.env.BUILD_TARGET === 'client' ? createBrowserHistory() : null;

export const $lastPushed = createStore('');

export const historyPush = createEvent<string>();
export const historyReplace = createEvent<string>();

if (process.env.BUILD_TARGET === 'client') {
  historyPush.watch((url) => history!.push(url));
  historyReplace.watch((url) => history!.replace(url));
} else {
  const events = merge([historyPush, historyReplace]);
  $lastPushed.on(events, (_, url) => url);
}
