/* globals window Worker localStorage */

import { addStories } from './actions';

const storyTypes = ['ask', 'show', 'job', 'new', 'best', 'top'];
let missingStories = [];

function storiesAreMissing() {
  if (missingStories.length > 0) {
    console.log('Some stories are missing', missingStories);
    return true;
  }
  console.log('No stories are missing');
  return false;
}

function terminateWorker(worker) {
  worker.terminate();
}

function startPhil(dispatch) {
  let phil;
  if (window.Worker) {
    if (!window.phil) window.phil = new Worker('hacker-news-worker.js');
    phil = window.phil;
    phil.postMessage({ type: 'message', data: 'Wake up Phil' });
    phil.onmessage = function onMessage(e) {
      const message = e.data;
      const { data } = message;
      console.log('Message received from Phil:', message);
      switch (message.type) {
        case 'message':
          if (message.data === 'I am awake') {
            phil.postMessage({
              type: 'command',
              command: 'get stories',
              data: missingStories,
            });
          }
          break;
        case 'stories':
          localStorage.setItem(message.storyType, JSON.stringify(data));
          missingStories = missingStories.filter(story => story !== message.storyType);
          dispatch(addStories({ [message.storyType]: data }));
          if (!storiesAreMissing()) {
            terminateWorker(phil);
            console.log('Phil went to sleep');
          }
          break;
        default:
          console.log('Unrecognised message type', message.type);
          break;
      }
    };
  }
}

export default {
  injectDispatch(dispatch) {
    storyTypes.forEach((storyType) => {
      const type = storyType;
      if (localStorage[type]) {
        const typeArray = localStorage.getItem(type);
        if (typeArray) dispatch(addStories({ [type]: JSON.parse(typeArray) }));
      } else missingStories.push(type);
    });
    if (storiesAreMissing()) startPhil(dispatch);
  },
};
