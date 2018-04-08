// @flow
import React from 'react';
import { HashRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import Stories from './Stories';
import { storyTypes } from './../messenger';

type Props = {
  stories: Object,
};

const App = ({ stories }: Props) => {
  const makeRoute = (path, component) => (
    <Route exact path={`/${path}`} component={component} key={path} />
  );
  const makeStories = (path) => {
    const StoriesPage = () => (
      <Stories stories={stories[path]} storyTitle={`${path} - hacker news`} />
    );
    return makeRoute(path, StoriesPage);
  };
  const Routes = storyTypes.map(makeStories);
  const makeLink = path => (
    <Link to={`/${path}`} key={path} replace>
      {path}
    </Link>
  );
  const NavLinks = storyTypes.map(makeLink);
  const Main = () => (
    <React.Fragment>
      <nav>{NavLinks}</nav>
      <Switch>{Routes}</Switch>
    </React.Fragment>
  );
  return (
    <Router>
      <Main />
    </Router>
  );
};

export default App;
