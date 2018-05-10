import React from 'react'
import { Route } from 'react-router-dom'

import { JoinPage } from './pages/join'
import { RegistrationPage } from './pages/registration'


export const joinRoutes = () => [
  <Route key="join" path="/join" component={JoinPage} exact />,
  <Route key="regs" path="/join/registration" component={RegistrationPage} exact />,
]
