import axios from 'axios';
import {
  FETCH_POSTS,
  CLEAR_POSTS,
  FETCH_POST,
  CLEAR_POST
} from './types';

export const fetchPosts = (page = 1, offset = 6) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts?page=${page}&offset=${offset}`);

    dispatch({ type: FETCH_POSTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const clearPosts = () => ({
  type: CLEAR_POSTS
});


export const fetchPost = postId => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);

    dispatch({ type: FETCH_POST, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const clearPost = () => ({
  type: CLEAR_POST
});
