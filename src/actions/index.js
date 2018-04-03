export const ADD_STORIES = 'ADD_STORIES';

export function addStories(stories) {
  return { type: ADD_STORIES, stories };
}
