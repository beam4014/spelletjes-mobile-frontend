import * as types from '../actions/authentication/authenticationTypes';

export default function authenticationReducer(state = {}, action) {
  switch (action.type) {
    case types.AUTHENTICATION_SUCCESSFUL:
      return Object.assign(
        {},
        state,
        {
          token: action.token,
        },
      );
    case types.AUTHENTICATION_FAILED:
      return Object.assign(
        {},
        state,
        {
          token: null,
        },
      );
    default:
      return state;
  }
}
