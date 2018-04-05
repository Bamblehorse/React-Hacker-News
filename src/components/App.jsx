// @flow
import React from 'react';

import Stories from './Stories';

type Props = {
  stories: Object,
};

class App extends React.Component<Props> {
  render() {
    const { stories } = this.props;
    const storiesKeys = Object.keys(stories);
    const storiesArray = storiesKeys.map(key => (
      <Stories stories={this.props.stories[key]} key={key} />
    ));
    return storiesArray;
  }
}

export default App;
