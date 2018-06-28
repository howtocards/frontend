import { JoinPage } from './pages/join'
import { LogoutPage } from './pages/logout'
import { RegistrationPage } from './pages/registration'


export const joinRoutes = () => [
  {
    path: '/join',
    exact: true,
    component: JoinPage,
  },
  {
    path: '/join/registration',
    exact: true,
    component: RegistrationPage,
  },
  {
    path: '/logout',
    exact: true,
    component: LogoutPage,
  },
]
