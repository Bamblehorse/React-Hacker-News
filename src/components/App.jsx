// @flow
import React from 'react';
import { HashRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import Stories from './Stories';
import { storyTypes } from './../messenger';

type Props = {
  stories: Object,
};

const App = ({ stories }: Props) => {
  const makeStories = (key) => {
    const k = key;
    const StoriesPage = () => <Stories stories={stories[k]} storyTitle={`${k} - hacker news`} />;
    return <Route path={`/${k}`} component={StoriesPage} key={k} />;
  };
  const Routes = storyTypes.map(makeStories);
  const makeLink = path => (
    <Link to={`/${path}`} key={path}>
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
