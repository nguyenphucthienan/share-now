import { FETCH_USER } from '../actions/types';

const DEFAULT_STATE = null;

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload;
    default:
      return state;
  }
}
