import * as employeeActions from '../actions/types';

export default function employeeReducers(state = [], action) {
  switch (action.type) {
    case employeeActions.FETCH_EMPLOYEES: {
      return [...action.payload];
    }
    default:
      return state;
  }
}
