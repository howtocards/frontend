// @flow
import * as React from "react"
import { renderRoutes } from "react-router-config"

import { searchRoutes } from "@features/search"
import { routes as root } from "./pages"

const routes = [...root(), ...searchRoutes()]

export const Routes = () => <>{renderRoutes(routes)}</>
