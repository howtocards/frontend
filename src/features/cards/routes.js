import { CardCreatePage } from "./pages/create"
import { CardsHomePage } from "./pages/home"
import { CardViewPage } from "./pages/view"

export const cardsRoutes = () => [
  {
    path: "/",
    exact: true,
    component: CardsHomePage,
  },
  {
    path: "/new",
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
    component: CardViewPage,
  },
]
