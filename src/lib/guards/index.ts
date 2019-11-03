// @flow
import * as React from "react"

// eslint-disable-next-line no-use-before-define
type Guard<C> = (route: Route<C>, context: C) => Route<C> | null | void

type Route<C> = {
  path: string,
  component: React.Component<*>,
  guards?: Guard<C>[],
}

type SimpleRoute = {
  path: string,
  exact: boolean,
  component: React.Component<*>,
}

export function compileGuards<C>(
  routes: Route<C>[],
  context: C,
): SimpleRoute[] {
  return routes
    .map((route) =>
      route.guards
        ? route.guards.reduce(
            (currentRoute, guard) =>
              currentRoute ? guard(currentRoute, context) : undefined,
            route,
          )
        : route,
    )
    .filter(Boolean)
    .map((route) => ({
      path: route.path,
      component: route.component,
      exact: true,
    }))
}
