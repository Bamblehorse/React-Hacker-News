import React from 'react';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import App from '../components/App';
import Messenger from './../messenger';
import reducers from './../reducers';

const store = createStore(
  reducers, // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

function mapStateToProps(state) {
  return { stories: state.stories };
}

function mapDispatchToProps(dispatch) {
  return Messenger.injectDispatch(dispatch);
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

const Root = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default Root;
