import React from "react"
import { renderRoutes } from "react-router-config"

import { NotFoundPage } from "@features/common"
import { cardsRoutes } from "@features/cards"
import { joinRoutes } from "@features/join"
import { usersRoutes } from "@features/users"
import { searchRoutes } from "@features/search"

const routes = [
  ...cardsRoutes(),
  ...joinRoutes(),
  ...usersRoutes(),
  ...searchRoutes(),
  { component: NotFoundPage },
]

export const Routes = () => <>{renderRoutes(routes)}</>
