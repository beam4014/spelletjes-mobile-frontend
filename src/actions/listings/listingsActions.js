import axios from 'axios';
import * as types from './listingsTypes';
import { URL_API } from '../url';

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
      .catch(() => dispatch(fetchListingFailed()));
  };
}


export function fetchGames() {
  return function (dispatch) {
    return axios({
      url: `${URL_API}games`,
      method: 'get',
    }).then((response) => {
      dispatch({
        type: types.FETCH_GAMES_SUCCESSFUL,
        games: response.data,
      });
    }).catch(() => {
      dispatch({
        type: types.FETCH_GAMES_FAILURE,
      });
    });
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
export function submitListing(title, gameId, gameTitle, gameImage, type, secondaryType, price, description) {
  return function (dispatch) {
    return axios({
      method: 'post',
      url: `${URL_API}listings/create`,
      data: {
        title,
        game_id: gameId,
        game_title: gameTitle,
        game_image: gameImage,
        type,
        secondary_type: secondaryType,
        asking_price: price,
        description,
      },
    }).then((response) => {
      dispatch(submitListingSuccessful(response.data));
    }).catch(() => {
      dispatch(submitListingFailed());
    });
  };
}
export function editListing(listingId, title, price, description) {
  return function (dispatch) {
    return axios({
      method: 'post',
      url: `${URL_API}listings/${listingId}/update`,
      data: {
        title,
        price,
        description,
      },
    }).then(() => {
      dispatch({
        type: types.EDIT_LISTING_SUCCESSFUL,
      });
    }).catch(() => {
      dispatch({
        type: types.EDIT_LISTING_FAILED,
      });
    });
  };
}

export function deleteListing(listingId) {
  return function (dispatch) {
    return axios({
      method: 'post',
      url: `${URL_API}listings/${listingId}/delete`,
    }).then(() => {
      dispatch({
        type: types.LISTING_DELETE_SUCCESSFUL,
      });
    }).catch(() => {
      dispatch({
        type: types.LISTING_DELETE_FAILURE,
      });
    });
  };
}

export function reportListing(listingId) {
  return function (dispatch) {
    return axios({
      method: 'post',
      url: `${URL_API}listings/${listingId}/report`,
    }).then(() => {
      dispatch({
        type: types.LISTING_REPORT_SUCCESSFUL,
      });
    }).catch(() => {
      dispatch({
        type: types.LISTING_REPORT_FAILURE,
      });
    });
  };
}
