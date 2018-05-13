import * as types from './authenticationTypes';
import axios from 'axios';

function authenticationSuccessful(token) {
    return {
        type: types.AUTHENTICATION_SUCCESSFUL,
        token: token,
    }
}

function authenticationFailed() {
    return {
        type: types.AUTHENTICATION_FAILED
    }
}

export function authenticate(username, password) {
    return function(dispatch) {
        return  axios.post('http://10.0.2.2:8000/oauth/token', {
                grant_type: 'password',
                client_id: '2',
                client_secret: '2eVoCJN46QDFaSYbUBI0RzD9ncs7YFr9Trus3GaF',
                username: username,
                password: password,
                scope: ''
            })
            .then(response => {
                console.log(response);
                return dispatch(authenticationSuccessful(response.data.access_token))
            })
            .catch(error => {
                console.log(error);
                return dispatch(authenticationFailed())
            });
    }
}