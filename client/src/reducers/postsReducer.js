import { FETCH_POSTS } from '../actions/types';

const DEFAULT_STATE = {
  totalPosts: 0,
  postsData: []
};

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;
    default:
      return state;
  }
}
