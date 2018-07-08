import axios from 'axios';
import { FETCH_CLIENTS, ADD_CLIENT, REMOVE_CLIENT, EDIT_CLIENT } from './types';

export const getClients = () => async dispatch => {
  const res = await axios.get('/api/clients');
  dispatch({type: FETCH_CLIENTS, payload: res.data})
}

export const addClient = client => async dispatch => {
  const res = await axios.post('/api/client', client);
  console.log("DATA RES", res.data);
  dispatch({type: ADD_CLIENT, payload: res.data})
}

// export function addClient(client) {
//   return {
//     type: ADD_CLIENT,
//     client,
//   };
// }

export function removeClient(clientID) {
  return {
    type: REMOVE_CLIENT,
    clientID,
  };
}

export function editClient(client) {
  return {
    type: EDIT_CLIENT,
    client,
  };
}
