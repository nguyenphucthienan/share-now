import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import userReducer from './userReducer';
import postsReducer from './postsReducer';
import postReducer from './postReducer';

export default combineReducers({
  user: userReducer,
  posts: postsReducer,
  post: postReducer,
  form: reduxForm
});
