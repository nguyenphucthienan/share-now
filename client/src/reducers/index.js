import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import userReducer from './userReducer';
import postsReducer from './postsReducer';

export default combineReducers({
  user: userReducer,
  posts: postsReducer,
  form: reduxForm
});
