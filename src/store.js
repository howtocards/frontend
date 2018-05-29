import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'


import { rootReducer } from './reducers'
import { Api } from './request-api'
import { JoinApi } from './features/join'
import { AccountApi } from './features/account'


export function configureStore(initialState = {}) {
  const api = new Api('/api')
  const joinApi = new JoinApi(api)
  const accountApi = new AccountApi(api)

  const middlewares = [
    thunk.withExtraArgument({ joinApi, accountApi }),
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
