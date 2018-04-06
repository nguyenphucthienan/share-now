import axios from 'axios';
import {
  FETCH_COMMENTS,
  CLEAR_COMMENTS
} from './types';

export const fetchComments = postId => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postId}/comments`);

    dispatch({ type: FETCH_COMMENTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const clearComments = () => ({
  type: CLEAR_COMMENTS
});
