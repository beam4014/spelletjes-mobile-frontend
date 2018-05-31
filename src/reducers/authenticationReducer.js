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
    case types.REGISTER_SUCCESSFUL:
      return Object.assign(
        {},
        state,
        {
          registered: true,
        },
      );
    case types.REGISTER_FAILED:
      return Object.assign(
        {},
        state,
        {
          registered: false,
        },
      );
    case types.GET_USER_DATA_SUCCESSFUL:
      return Object.assign(
        {},
        state,
        {
          user: action.user,
        },
      );
    case types.GET_USER_DATA_FAILURE:
      return Object.assign(
        {},
        state,
        {
          user: null,
        },
      );
    default:
      return state;
  }
}
