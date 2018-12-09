import React from "react"
import { renderRoutes } from "react-router-config"

import { NotFoundPage } from "@features/common"
import { joinRoutes } from "@features/join"
import { cardsRoutes } from "@features/cards"

const routes = [...cardsRoutes(), ...joinRoutes(), { component: NotFoundPage }]

export const rootRoutes = () => (
  <React.Fragment>{renderRoutes(routes)}</React.Fragment>
)
