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
    dispatch({ type: FETCH_COMMENTS, payload: [] });
  }
};

export const clearComments = () => ({
  type: CLEAR_COMMENTS
});
