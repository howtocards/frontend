import React from 'react'
import { Route } from 'react-router-dom'

import { CardCreatePage } from './pages/create'


export const cardsRoutes = () => [
  <Route key="create" path="/new" exact component={CardCreatePage} />,
]
