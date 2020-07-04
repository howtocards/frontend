import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { fork, hydrate } from 'effector/fork';

import { root } from 'effector-root';
import { history } from 'features/navigation';
import { Application } from './application';

hydrate(root, { values: INITIAL_STATE });

const scope = fork(root);

ReactDOM.hydrate(
  <Router history={history!}>
    <Application root={scope} />
  </Router>,
  document.querySelector('#root'),
);

if (module.hot) {
  module.hot.accept();
}
