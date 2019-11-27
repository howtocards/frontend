// @flow
import { CardCreatePage } from "./create/page"
import { CardEditPage } from "./edit/page"
import { CardsHomePage } from "./home/page"
import { CardViewPage } from "./view/page"
import { JoinLoginPage } from "./join/login/page"
import { JoinRegistrationPage } from "./join/registration/page"
import { LogoutPage } from "./logout/page"
import { SearchPage } from "./search/page"
import { SettingsPage } from "./settings/page"
import { UserPage } from "./users/current/page"

import { NotFoundPage } from "./internal/not-found/page"

export const routes = () => [
  {
    path: "/",
    exact: true,
    component: CardsHomePage,
  },
  {
    path: "/join",
    exact: true,
    component: JoinLoginPage,
  },
  {
    path: "/join/registration",
    exact: true,
    component: JoinRegistrationPage,
  },
  {
    path: "/new/card",
    exact: true,
    component: CardCreatePage,
  },
  {
    // https://github.com/howtocards/preview-worker#api
    path: "/open/:cardId",
    exact: true,
    component: CardViewPage,
  },
  {
    path: "/edit/:cardId",
    exact: true,
    component: CardEditPage,
  },
  {
    path: "/logout",
    exact: true,
    component: LogoutPage,
  },
  {
    path: "/search",
    exact: true,
    component: SearchPage,
  },
  {
    path: "/settings",
    exact: true,
    component: SettingsPage,
  },
  {
    path: "/@:username",
    exact: true,
    component: UserPage,
  },

  { component: NotFoundPage },
]
