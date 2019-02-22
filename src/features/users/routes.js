import { UserPage } from "./pages/user"
import { SettingsPage } from "./pages/settings"

export const usersRoutes = () => [
  {
    path: "/settings",
    exact: true,
    component: SettingsPage,
  },
  {
    path: "/user/:userId",
    exact: true,
    component: UserPage,
  },
]
