import { ADD_STORIES } from './../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_STORIES:
      return Object.assign({}, state, action.stories);
    default:
      return state;
  }
}
