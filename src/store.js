import { createStore, applyMiddleware, compose } from "redux"
import { routerMiddleware } from "connected-react-router"
import { createLogger } from "redux-logger"
import { createExecute } from "redux-execute"

import { createReducer } from "./reducers"

const loggerOptions = {
  predicate: (getState, action) => !action.type.startsWith("@@router/"),
  collapsed: true,
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // eslint-disable-line no-underscore-dangle, max-len

export function configureStore({ history, initialState = {} } = {}) {
  const middlewares = [
    createExecute({ log: true }),
    createLogger(loggerOptions),
    routerMiddleware(history),
  ]

  const store = createStore(
    createReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  )

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      // eslint-disable-next-line global-require
      const next = require("./reducers")

      store.replaceReducer(next.createReducer(history))
    })
  }

  return store
}
