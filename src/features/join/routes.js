import React from 'react'
import { Route } from 'react-router-dom'

import { JoinPage } from './pages/join'


export const joinRoutes = () => (
  <Route path="/join" component={JoinPage} />
)
