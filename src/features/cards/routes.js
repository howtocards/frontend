import { CardCreatePage } from './pages/create'
import { CardsAllGetPage } from './pages/all'


export const cardsRoutes = () => [
  {
    path: '/',
    exact: true,
    component: CardsAllGetPage,
  },
  {
    path: '/new',
    exact: true,
    component: CardCreatePage,
  },
]
