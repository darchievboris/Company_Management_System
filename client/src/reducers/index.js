import { combineReducers } from 'redux';
import clientsReducer from './clientsReducer';
import authReducer from './authReducer';

export default combineReducers({
  clients: clientsReducer,
  auth: authReducer,
});
