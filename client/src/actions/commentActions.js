import axios from 'axios';
import { FETCH_COMMENTS } from './types';

export const fetchComments = postId => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postId}/comments`);

    dispatch({ type: FETCH_COMMENTS, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_COMMENTS, payload: [] });
  }
};
