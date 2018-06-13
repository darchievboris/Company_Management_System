export const GET_CLIENTS = 'GET_CLIENTS';
export const ADD_CLIENT = 'ADD_CLIENT';
export const REMOVE_CLIENT = 'REMOVE_CLIENT';
export const EDIT_CLIENT = 'EDIT_CLIENT';

export function getClients(clients) {
  return {
    type: GET_CLIENTS,
    clients,
  };
}

export function addClient(client) {
  return {
    type: ADD_CLIENT,
    client,
  };
}

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
