import * as React from 'react';
import { Scope } from 'effector/fork';
import { Provider, useEvent } from 'effector-react/ssr';

import { readyToLoadSession } from 'features/session';
import { Pages } from './pages';
import { Globals } from './globals';

interface Props {
  root: Scope;
}

export const Application: React.FC<Props> = ({ root }) => (
  <Provider value={root}>
    <Internal />
  </Provider>
);

const Internal: React.FC = () => {
  const readyToLoad = useEvent(readyToLoadSession);
  React.useEffect(() => readyToLoad(), [readyToLoad]);

  return (
    <>
      <Globals />
      <Pages />
    </>
  );
};
