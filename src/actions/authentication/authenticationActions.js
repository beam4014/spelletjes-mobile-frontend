import * as types from './authenticationTypes';
import axios from 'axios';
import {URL, URL_API} from "../url";

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

const setAxiosToken = (token) => {
  const accessToken = JSON.stringify(token).replace('"', '');
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};


export function authenticate(username, password) {
  return function (dispatch) {
    return axios.post(`${URL}oauth/token`, {
      grant_type: 'password',
      client_id: '1',
      client_secret: 'MDwL9kumKs4ajP3YvWR5kslrKKndEavb5PWTIvDg',
      username,
      password,
      scope: '',
    })
      .then((response) => {
        setAxiosToken(response.data.access_token);
        return dispatch(authenticationSuccessful(response.data.access_token));
      })
      .catch((error) => {
        return dispatch(authenticationFailed());
      });
  };
}
//register actions
export function register(name, password, confirmPassword, email,phoneNo) {
  return function (dispatch) {
    return axios.post(`${URL_API}register`, {
      name: name,
      password,
      email,
      password_confirmation: confirmPassword,
      phone_number: phoneNo,
    })
      .then((response) => {
        return dispatch({
          type: types.REGISTER_SUCCESSFUL,
        });
      })
      .catch((error) => {
        return dispatch({
          type: types.REGISTER_FAILED,
        });
      });
  };
}
