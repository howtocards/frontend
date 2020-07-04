import { createStore, createEvent, combine, guard, Unit } from 'effector-root';
import { condition } from 'patronum/condition';

import { sessionGet, SessionUser } from 'api/session';
import { historyPush } from 'features/navigation';
import { paths } from 'pages/paths';

export const readyToLoadSession = createEvent<void>();

export const sessionLoaded = sessionGet.finally;

export const $session = createStore<SessionUser | null>(null);
export const $isAuthenticated = $session.map((user) => user !== null);

// Show loading state if no session but first request is sent
export const $sessionPending = combine(
  [$session, sessionGet.pending],
  ([session, pending]) => !session && pending,
);

/**
 * If user not authenticated, redirect to login
 */
export function checkAuthenticated<T>(config: {
  when: Unit<T>;
  continue?: Unit<T>;
}): Unit<T> {
  const continueLogic = config.continue ?? createEvent();
  condition({
    source: config.when,
    if: $isAuthenticated,
    then: continueLogic,
    else: historyPush.prepend(paths.login),
  });
  return continueLogic;
}

/**
 * If user **anonymous**, continue, else redirect to home
 */
export function checkAnonymous<T>(config: {
  when: Unit<T>;
  continue?: Unit<T>;
}): Unit<T> {
  const continueLogic = config.continue ?? createEvent();
  condition({
    source: config.when,
    if: $isAuthenticated,
    then: historyPush.prepend(paths.home),
    else: continueLogic,
  });
  return continueLogic;
}

$session
  .on(sessionGet.done, (_, { result }) => result.body.user)
  .on(sessionGet.failData, (session, { status }) => {
    if (status === 401) {
      return null;
    }
    return session;
  });

guard({
  source: readyToLoadSession,
  filter: $sessionPending.map((is) => !is),
  target: sessionGet,
});
