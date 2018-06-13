import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { createApi } from 'api-injector'
import { Requester } from 'request-api'


import { rootReducer } from './reducers'
import { AccountApi } from './features/account'
import { CardsApi } from './features/cards'
import { JoinApi } from './features/join'


export function configureStore(initialState = {}) {
  const requester = new Requester('/api')

  const api = createApi(requester, [
    AccountApi,
    CardsApi,
    JoinApi,
  ])

  const middlewares = [
    thunk.withExtraArgument({ api }),
    createLogger({ collapsed: true }),
  ]
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

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
