import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/me');

    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
