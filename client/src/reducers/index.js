import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import userReducer from './userReducer';
import postsReducer from './postsReducer';
import postReducer from './postReducer';
import commentsReducer from './commentsReducer';

export default combineReducers({
  user: userReducer,
  posts: postsReducer,
  post: postReducer,
  comment: commentsReducer,
  form: reduxForm
});
