import { LoginPage } from './pages/login'
import { LogoutPage } from './pages/logout'
import { RegistrationPage } from './pages/registration'


export const joinRoutes = () => [
  {
    path: '/join',
    exact: true,
    component: LoginPage,
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
