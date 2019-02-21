import { UserPage } from "./pages/user"
import { SettingPage } from "./pages/setting"

export const usersRoutes = () => [
  {
    path: "/user/:userId",
    exact: true,
    component: UserPage,
  },
  {
    path: "/user/:userId/setting",
    exact: true,
    component: SettingPage,
  },
]
