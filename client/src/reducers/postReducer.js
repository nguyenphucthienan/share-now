import {
  FETCH_POST,
  CLEAR_POST
} from '../actions/types';

const DEFAULT_STATE = null;

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_POST:
      return action.payload;
    case CLEAR_POST:
      return DEFAULT_STATE;
    default:
      return state;
  }
}
