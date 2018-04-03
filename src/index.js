// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';
import reducers from './reducers';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

// null check for flow: https://github.com/facebook/flow/issues/1472
const root = document.getElementById('root');
if (root === null) throw Error('element with id root does not exist');
else {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    root,
  );
}
