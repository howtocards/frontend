import { CardCreatePage } from "./pages/create"
import { CardsListPage } from "./pages/cards-list-page"
import { CardPage } from "./pages/card-view-page"

export const cardsRoutes = () => [
  {
    path: "/",
    exact: true,
    component: CardsListPage,
  },
  {
    path: "/new",
    exact: true,
    component: CardCreatePage,
  },
  {
    path: "/open/:cardId",
    exact: true,
    component: CardPage,
  },
]
