import { CardCreatePage } from './pages/create'


export const cardsRoutes = () => [
  {
    path: '/new',
    exact: true,
    component: CardCreatePage,
  },
]
