import {
  FETCH_MY_POSTS,
  CLEAR_MY_POSTS
} from '../actions/types';

const DEFAULT_STATE = {
  totalPages: 0,
  page: 1,
  postsData: []
};

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_MY_POSTS:
      return action.payload;
    case CLEAR_MY_POSTS:
      return { ...state, postsData: [] };
    default:
      return state;
  }
}
