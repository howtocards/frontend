import { CardCreatePage } from './pages/create'
import { CardsListPage } from './pages/cards-list-page'


export const cardsRoutes = () => [
  {
    path: '/',
    exact: true,
    component: CardsListPage,
  },
  {
    path: '/new',
    exact: true,
    component: CardCreatePage,
  },
]
