import { createStore, applyMiddleware, compose } from "redux"
import { routerMiddleware } from "connected-react-router"
import { createExecute } from "redux-execute"

import { createReducer } from "./reducers"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // eslint-disable-line no-underscore-dangle, max-len

export function configureStore({ history, initialState = {} } = {}) {
  const middlewares = [createExecute({ log: false }), routerMiddleware(history)]

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
