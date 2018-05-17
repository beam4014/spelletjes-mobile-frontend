import axios from 'axios';
import * as types from './listingsTypes';


//fetch listing
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

//submit listing
function submitListingSuccessful(data) {
  return {
    type: types.SUBMIT_LISTING_SUCCESSFUL,
    data,
  };
}
function submitListingFailed() {
  return {
    type: types.SUBMIT_LISTING_FAILED,
  };
}
export function submitListing(title,game_id,type,price,description) {
  return function (dispatch) {
    return axios.post('localhost:8000/api/listings/create',{
      title,
      game_id,
      type,
      price,
      description,
    })
      .then(response => dispatch(submitListingSuccessful(response.data)))
      .catch(error => dispatch(submitListingFailed()));
  };
}

