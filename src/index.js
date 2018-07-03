import 'zone.js'
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import { App } from './app'
import { setStore } from './core/store'
import { configureStore } from './core/create-store'


const root = document.getElementById('root')


const render = ({ history, store }) => {
  ReactDom.render(
    (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    ),
    root,
  )
}

function main() {
  const history = createBrowserHistory()
  const store = configureStore({ history })

  setStore(store)
  render({ history, store })
}

Zone.current.fork({ properties: { id: 1 } }).run(() => {
  if (module.hot) {
    module.hot.accept('./app', render)
  }

  main()
})
