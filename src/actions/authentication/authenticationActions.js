import * as types from './authenticationTypes';
import axios from 'axios';

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
    return axios.post('http://localhost:8000/oauth/token', {
      grant_type: 'password',
      client_id: '2',
      client_secret: 'OygN6NzJ5pgz8CYnxeQoUEK79G3T3JDrw0X4yXUx',
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
