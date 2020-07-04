import { paths } from './paths';

import { ExplorePage } from './explore';
import { JoinPage } from './join';
import { CardPage } from './card';

import { Error404Page } from './error404';

export const routes = [
  {
    path: paths.explore(),
    exact: true,
    component: ExplorePage,
  },
  {
    path: paths.join(),
    exact: true,
    component: JoinPage,
  },
  {
    path: paths.card(),
    exact: true,
    component: CardPage,
  },
  {
    path: '*',
    component: Error404Page,
  },
];
