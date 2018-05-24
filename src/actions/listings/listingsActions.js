import axios from 'axios';
import * as types from './listingsTypes';
import { URL_API } from '../url';
import { AsyncStorage } from 'react-native';


// fetch SingleListing
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
    return axios.get(`${URL_API}listings`)
      .then(response => dispatch(fetchListingSuccessful(response.data)))
      .catch(error => dispatch(fetchListingFailed()));
  };
}

// submit SingleListing
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
export function submitListing(token, title, game_id, type, price, description) {
  return function (dispatch) {
    return axios({
      method: 'post',
      url: `${URL_API}listings/create`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        title,
        game_id,
        type,
        price,
        description,
      },
    }).then((response) => {
      dispatch(submitListingSuccessful(response.data));
    }).catch((error) => {
      dispatch(submitListingFailed());
    });
  };
}

