import { combineReducers } from 'redux';
import clientsReducer from './clientsReducer';
import authReducer from './authReducer';
import employeeReducer from './employeeReducer';

export default combineReducers({
  clients: clientsReducer,
  auth: authReducer,
  employees: employeeReducer,
});
