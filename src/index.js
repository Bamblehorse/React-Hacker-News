// @flow
import React from 'react';
import { render } from 'react-dom';

import Root from './containers/Root';
import register from './registerServiceWorker';

// null check for flow: https://github.com/facebook/flow/issues/1472
const root = document.getElementById('root');
if (root === null) throw Error('element with id root does not exist');
else {
  // eslint-disable-next-line react/jsx-filename-extension
  render(<Root />, root);
}

register();
