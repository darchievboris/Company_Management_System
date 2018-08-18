import axios from 'axios';
import { FETCH_EMPLOYEES, ADD_EMPLOYEE } from './types';

export const getEmployees = () => async dispatch => {
  const res = await axios.get('/api/employee');
  dispatch({ type: FETCH_EMPLOYEES, payload: res.data });
};

export const addEmployee = employee => async dispatch => {
  const res = await axios.post('/api/employee', employee);
  dispatch({ type: ADD_EMPLOYEE, payload: res.data });
};
