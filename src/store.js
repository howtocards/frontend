import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { createExecue } from 'redux-execue'


import { rootReducer } from './reducers'


export function configureStore(initialState = {}) {
  const middlewares = [
    createExecue({ log: true }),
    createLogger({ collapsed: true }),
  ]

  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const composeEnhancers = compose

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  )

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('./reducers')

      store.replaceReducer(nextRootReducer.rootReducer)
    })
  }

  return store
}
