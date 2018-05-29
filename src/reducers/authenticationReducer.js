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
    case types.SMS_GENERATION_SUCCESSFUL:
      return Object.assign(
        {},
        state,
        {
          verificationCodeSent: true
        }
      );
    case types.SMS_GENERATION_FAILURE:
      return Object.assign(
        {},
        state,
        {
          verificationCodeSent: false
        }
      );
    case types.SMS_VERIFICATION_SUCCESSFUL:
      return Object.assign(
        {},
        state,
        {
          verified: true
        }
      );
    case types.SMS_VERIFICATION_FAILURE:
      return Object.assign(
        {},
        state,
        {
          verified: false
        }
      );
    default:
      return state;
  }
}
