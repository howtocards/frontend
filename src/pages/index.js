// @flow
import { CardCreatePage } from "./create/page"
import { CardsHomePage } from "./home/page"
import { CardViewPage } from "./view/page"
import { SettingsPage } from "./settings/page"
import { CardEditPage } from "./edit/page"

export const routes = () => [
  {
    path: "/settings",
    exact: true,
    component: SettingsPage,
  },
  {
    path: "/",
    exact: true,
    component: CardsHomePage,
  },
  {
    path: "/new/card",
    exact: true,
    component: CardCreatePage,
  },
  {
    path: "/open/:cardId",
    exact: true,
    component: CardViewPage,
  },
  {
    path: "/edit/:cardId",
    exact: true,
    component: CardEditPage,
  },
]
