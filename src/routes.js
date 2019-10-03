// @flow
import * as React from "react"
import { renderRoutes } from "react-router-config"

import { NotFoundPage } from "@features/common"
import { searchRoutes } from "@features/search"
import { routes as root } from "./pages"

const routes = [...root(), ...searchRoutes(), { component: NotFoundPage }]

export const Routes = () => <>{renderRoutes(routes)}</>
