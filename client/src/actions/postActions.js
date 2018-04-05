import axios from 'axios';
import {
  FETCH_POSTS,
  FETCH_POST
} from './types';

export const fetchPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({ type: FETCH_POSTS, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_POSTS, payload: [] });
  }
};

export const fetchPost = postId => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);

    dispatch({ type: FETCH_POST, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_POST, payload: null });
  }
};
