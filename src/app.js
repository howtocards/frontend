import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'


export const App = hot(module)(() => (
  <BrowserRouter>
    <div>Hello world</div>
  </BrowserRouter>
))
