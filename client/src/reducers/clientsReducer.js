import * as clientActions from '../actions/types';

export default function clientsReducers(state = [], action) {
  switch (action.type) {
    case clientActions.FETCH_CLIENTS: {
      return [...action.payload];
    }
    case clientActions.ADD_CLIENT: {
      return [...state, action.payload];
    }
    case clientActions.REMOVE_CLIENT: {
      return state.filter(client => client._id !== action.payload);
    }
    case clientActions.EDIT_CLIENT: {
      return state.map(client => (client._id === action.payload._id ? { ...client, ...action.payload } : client));
    }
    default:
      return state;
  }
}
