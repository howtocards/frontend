// @flow
import * as React from "react"
import ReactDom from "react-dom"
import { Router } from "react-router"

import { history } from "@lib/routing"
import { App } from "./app"

const root = document.querySelector("#root")

const render = () => {
  if (root) {
    ReactDom.render(
      <Router history={history}>
        <App />
      </Router>,
      root,
    )
  }
}

// $FlowIssue
if (module.hot) {
  module.hot.accept("./app", render)
}

render()
