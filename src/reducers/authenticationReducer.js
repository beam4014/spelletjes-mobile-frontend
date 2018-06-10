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
    case types.USER_VERIFICATION_STATUS_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          verified: action.verified,
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
    case types.SMS_VERIFICATION_SENT_SUCCESSFUL:
      return Object.assign(
        {},
        state,
        {
          codeSent: true,
        },
      );
    case types.SMS_VERIFICATION_SENT_FAILED:
      return Object.assign(
        {},
        state,
        {
          codeSent: false,
        },
      );
    case types.USER_VERIFIED:
      return Object.assign(
        {},
        state,
        {
          verified: true,
        },
      );
    case types.USER_NOT_VERIFIED:
      return Object.assign(
        {},
        state,
        {
          verified: false,
        },
      );
    default:
      return state;
  }
}
