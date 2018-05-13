import axios from 'axios';
import * as types from './listingsTypes';

function fetchListingSuccessful(data) {
  return {
    type: types.FETCH_LISTING_SUCCESSFUL,
    data,
  };
}

function fetchListingFailed() {
  return {
    type: types.FETCH_LISTING_FAILED,
  };
}


export function fetchListing() {
  return function (dispatch) {
    return axios.get('http://localhost:8000/api/listings')
      .then(response => dispatch(fetchListingSuccessful(response.data)))
      .catch(error => dispatch(fetchListingFailed()));
  };
}

