import { UserPage } from "./pages/user"

export const usersRoutes = () => [
  {
    path: "/user/:userId",
    exact: true,
    component: UserPage,
  },
]
