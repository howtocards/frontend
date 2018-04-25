import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'

import { App } from './app'
import { configureStore } from './store'


const root = document.getElementById('root')
const store = configureStore()
const render = () => {
  ReactDom.render(<Provider store={store}><App /></Provider>, root)
}

if (module.hot) {
  module.hot.accept('./app', render)
}

render()
