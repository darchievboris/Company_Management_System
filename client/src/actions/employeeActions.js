import axios from 'axios';
import { FETCH_EMPLOYEES } from './types';

export const getEmployees = () => async dispatch => {
  const res = await axios.get('/api/employee');
  dispatch({ type: FETCH_EMPLOYEES, payload: res.data });
};
