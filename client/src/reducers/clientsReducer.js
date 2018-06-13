import * as clientActions from '../actions/clientsActions';

export default function categoriesReducers(state = [], action) {
  switch (action.type) {
    case clientActions.GET_CLIENTS: {
      return [...action.clients];
    }
    case clientActions.ADD_CLIENT: {
      return [...state, action.client];
    }
    case clientActions.REMOVE_CLIENT: {
      return state.filter(client => client.id !== action.clientID);
    }
    case clientActions.EDIT_CLIENT: {
      return state.map(client => (client.id === action.client.id ? { ...client, ...action.client } : client));
    }
    default:
      return state;
  }
}
