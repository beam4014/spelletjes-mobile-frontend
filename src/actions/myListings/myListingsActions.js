import axios from 'axios';
import * as types from './myListingsTypes';
import { URL_API } from '../url';

const setAxiosToken = (token) => {
  const accessToken = JSON.stringify(token).replace('"', '');
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

function fetchMyListingSuccessful(data) {
  return {
    type: types.FETCH_MYLISTING_SUCCESSFUL,
    data,
  };
}

function fetchMyListingFailed(error) {
  console.log(error);
  return {
    type: types.FETCH_MYLISTING_FAILED,
  };
}

export function fetchMyListing(token) {
  setAxiosToken(token);
  return function (dispatch) {
    return axios({
      method: 'get',
      url: `${URL_API}me/listings`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => dispatch(fetchMyListingSuccessful(response.data)))
      .catch(error => dispatch(fetchMyListingFailed(error)));
  };
}

