import React from 'react'
import { Route } from 'react-router-dom'

import { JoinPage } from './pages/join'
import { LogoutPage } from './pages/logout'
import { RegistrationPage } from './pages/registration'


export const joinRoutes = () => [
  <Route key="join" path="/join" exact component={JoinPage} />,
  <Route key="regs" path="/join/registration" exact component={RegistrationPage} />,
  <Route key="logu" path="/logout" exact component={LogoutPage} />,
]
