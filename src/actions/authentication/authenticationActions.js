import * as types from './authenticationTypes';
import axios from 'axios';
import { URL, URL_API } from '../url';

function authenticationSuccessful(token) {
  return {
    type: types.AUTHENTICATION_SUCCESSFUL,
    token,
  };
}

function authenticationFailed() {
  return {
    type: types.AUTHENTICATION_FAILED,
  };
}

export const setAxiosToken = (token) => {
  const accessToken = JSON.stringify(token).replace('"', '');
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};


export function authenticate(username, password) {
  return function (dispatch) {
    return axios.post(`${URL}oauth/token`, {
      grant_type: 'password',
      client_id: '1',
      client_secret: 'oTKBt93bz5MAHxXWg9ZCQlqPHaunWQ5tbKK7YtLO',
      username,
      password,
      scope: '',
    })
      .then((response) => {
        setAxiosToken(response.data.access_token);
        dispatch(authenticationSuccessful(response.data.access_token));
      })
      .catch(() => dispatch(authenticationFailed()));
  };
}

// register actions
export function register(name, email, password, confirmPassword, phoneNo) {
  return function (dispatch) {
    return axios.post(`${URL_API}register`, {
      name,
      password,
      email,
      password_confirmation: confirmPassword,
      phone_number: phoneNo,
    })
      .then(() => dispatch({
        type: types.REGISTER_SUCCESSFUL,
      }))
      .catch(() => dispatch({
        type: types.REGISTER_FAILED,
      }));
  };
}


export function getAuthenticatedUserData(token) {
  setAxiosToken(token);
  return function (dispatch) {
    return axios({
      method: 'get',
      url: `${URL_API}me`,
    }).then(response => dispatch({
      type: types.GET_USER_DATA_SUCCESSFUL,
      user: response.data.data,
    })).catch(() => dispatch({
      user: null,
      type: types.GET_USER_DATA_FAILURE,
    }));
  };
}

export function getUserVerificationStatus() {
  return function (dispatch) {
    return axios({
      method: 'post',
      url: `${URL_API}sms/status`,
    }).then((response) => {
      dispatch({
        type: types.USER_VERIFICATION_STATUS_SUCCESS,
        verified: response.data.verified,
      });
      console.log(response);
    }).catch(() => {
      dispatch({
        type: types.USER_VERIFICATION_STATUS_FAILED,
        verified: false
      });
    });
  };
}

export function sendSmsVerificationCode() {
  return function (dispatch) {
    return axios({
      method: 'post',
      url: `${URL_API}sms/generate`,
    }).then(() => dispatch({
      type: types.SMS_VERIFICATION_SENT_SUCCESSFUL,
    })).catch(() => dispatch({
      type: types.SMS_VERIFICATION_SENT_FAILED,
    }));
  };
}

export function verifyUser(code) {
  return function (dispatch) {
    return axios({
      method: 'post',
      url: `${URL_API}sms/verify`,
      data: {
        code,
      },
    }).then(() => dispatch({
      type: types.USER_VERIFIED,
    })).catch(() => dispatch({
      type: types.USER_NOT_VERIFIED,
    }));
  };
}
