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
      client_secret: 'EY4vhbxToKvh0kiB7AOHQ3i3erypODSXfebwIeC2',
      username,
      password,
      scope: '',
    })
      .then((response) => {
        setAxiosToken(response.data.access_token);
        dispatch(authenticationSuccessful(response.data.access_token));
      })
      .catch(error => dispatch(authenticationFailed()));
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
      .then(response => dispatch({
        type: types.REGISTER_SUCCESSFUL,
      }))
      .catch(error => dispatch({
        type: types.REGISTER_FAILED,
      }));
  };
}
