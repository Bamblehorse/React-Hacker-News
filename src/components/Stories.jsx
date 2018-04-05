// @flow
import React from 'react';

type Props = {
  stories?: Object[],
  storyTitle: string,
};

const Stories = ({ stories, storyTitle }: Props) => {
  if (stories) {
    const storyArray = stories.map((story) => {
      const {
        by, id, kids, descendants, score, time, title, type, text, url,
      } = story;
      return (
        <article key={id} className="story">
          <h1>
            {title} - {by}
          </h1>
          <section>
            <p>{text}</p>
            <a href={url}>{url}</a>
          </section>
          <aside>
            <h3>
              {descendants} Comments - {score} Points
            </h3>
            <h4>
              <time>{time}</time>
            </h4>
          </aside>
          <hr />
        </article>
      );
    });
    return (
      <React.Fragment>
        <h1>{storyTitle}</h1>
        <hr />
        {storyArray}
      </React.Fragment>
    );
  }
  return <h1> Loading {storyTitle}...</h1>;
};

export default Stories;
