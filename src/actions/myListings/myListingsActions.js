import axios from 'axios';
import * as types from './myListingsTypes';

function fetchMyListingSuccessful(data) {
  return {
    type: types.FETCH_MYLISTING_SUCCESSFUL,
    data,
  };
}

function fetchMyListingFailed() {
  return {
    type: types.FETCH_MYLISTING_FAILED,
  };
}
export function fetchMyListing() {
  return function (dispatch) {
    return axios.get('http://localhost:8000/api/listings') //the endpoint has to be changed
      .then(response => dispatch(fetchMyListingSuccessful(response.data)))
      .catch(error => dispatch(fetchMyListingFailed()));
  };
}

