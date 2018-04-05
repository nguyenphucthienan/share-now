import { FETCH_COMMENTS } from '../actions/types';

const DEFAULT_STATE = [];

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return action.payload;
    default:
      return state;
  }
}
