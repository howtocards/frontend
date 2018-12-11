import React from "react"

const UserPage = () => <div>Example user page</div>

export const usersRoutes = () => [
  {
    path: "/user/:userId",
    exact: true,
    component: UserPage,
  },
]
