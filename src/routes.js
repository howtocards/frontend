// @flow
import * as React from "react"
import { renderRoutes } from "react-router-config"
import { routes } from "./pages"

export const Routes = () => <>{renderRoutes(routes)}</>
