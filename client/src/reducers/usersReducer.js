import { FETCH_USERS } from '../actions/types';

const DEFAULT_STATE = [];

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    default:
      return state;
  }
}
