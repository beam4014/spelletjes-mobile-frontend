import axios from 'axios';
import * as types from './listingsTypes';
import { URL_API } from '../url';

export const setAxiosToken = (token) => {
  const accessToken = JSON.stringify(token).replace('"', '');
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

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
export function submitListing(title, game_id, type, price, description) {
  return function (dispatch) {
    return axios({
      method: 'post',
      url: `${URL_API}listings/create`,
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
function editListingSuccessful(data) {
  return {
    type: types.EDIT_LISTING_SUCCESSFUL,
    data,
  };
}
function editListingFailed() {
  return {
    type: types.EDIT_LISTING_FAILED,
  };
}
export function editListing(listingId, title, price, description) {
  return function (dispatch) {
    return axios({
      method: 'post',
      url: `${URL_API}listings/${listingId}/update`,
      data: {
        title,
        game_id,
        type,
        price,
        description,
      },
    }).then((response) => {
      dispatch(editListingSuccessful(response.data));
    }).catch((error) => {
      dispatch(editListingFailed());
    });
  };
}
