import React from 'react';
import { connect } from 'react-redux';
import Messenger from './../messenger';

import Stories from './Stories';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { stories } = this.props;
    const storiesKeys = Object.keys(stories);
    const storiesArray = storiesKeys.map(key => <Stories stories={this.props.stories[key]} />);
    return storiesArray;
  }
}

function mapStateToProps(state) {
  return { stories: state.stories };
}

function mapDispatchToProps(dispatch) {
  Messenger.injectDispatch(dispatch);
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;
