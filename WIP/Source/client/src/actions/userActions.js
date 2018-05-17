import axios from 'axios';
import {
  FETCH_USER,
  FETCH_USERS
} from './types';

export const fetchUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/me');

    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const fetchUsers = (page = 1, offset = 10) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users?page=${page}&offset=${offset}`);

    dispatch({ type: FETCH_USERS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
