import { CardCreatePage } from './pages/create'
import { CardsGetPage } from './pages/all'


export const cardsRoutes = () => [
  {
    path: '/',
    exact: true,
    component: CardsGetPage,
  },
  {
    path: '/new',
    exact: true,
    component: CardCreatePage,
  },
]
