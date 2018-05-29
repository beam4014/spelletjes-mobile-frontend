import axios from 'axios';
import * as types from './myListingsTypes';
import { URL_API } from '../url';

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

export function fetchMyListing() {
  return function (dispatch) {
    return axios({
      method: 'get',
      url: `${URL_API}me/listings`,
    }).then(response => dispatch(fetchMyListingSuccessful(response.data)))
      .catch(error => dispatch(fetchMyListingFailed(error)));
  };
}

