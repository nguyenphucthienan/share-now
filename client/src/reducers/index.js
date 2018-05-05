import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import userReducer from './userReducer';
import usersReducer from './usersReducer';
import postsReducer from './postsReducer';
import postReducer from './postReducer';
import commentsReducer from './commentsReducer';

export default combineReducers({
  user: userReducer,
  users: usersReducer,
  posts: postsReducer,
  post: postReducer,
  comments: commentsReducer,
  form: reduxForm
});
