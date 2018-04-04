import axios from 'axios';
import { FETCH_POSTS } from './types';

export const fetchPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({ type: FETCH_POSTS, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_POSTS, payload: [] });
  }
};
