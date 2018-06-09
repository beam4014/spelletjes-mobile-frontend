import axios from 'axios';
import * as types from './offersTypes';
import { URL_API } from '../url';

function submitOfferSuccessful(data) {
  return {
    type: types.SUBMIT_OFFER_SUCCESSFUL,
    data,
  };
}

function submitOfferFailed() {
  return {
    type: types.SUBMIT_OFFER_FAILED,
  };
}
export function submitOffer(listingId, price, type, description) {
  return function (dispatch) {
    return axios({
      method: 'post',
      url: `${URL_API}listings/${listingId}/offers/create`,
      data: {
        type,
        price: price || null,
        text: description,
      },
    }).then((response) => {
      dispatch(submitOfferSuccessful(response.data));
    }).catch((error) => {
      dispatch(submitOfferFailed());
    });
  };
}
function acceptOfferSuccessful(data) {
  return {
    type: types.ACCEPT_OFFER_SUCCESSFUL,
    data,
  };
}

function acceptOfferFailed() {
  return {
    type: types.ACCEPT_OFFER_FAILED,
  };
}
export function acceptOffer(offerId) {
  return function (dispatch) {
    return axios({
      method: 'post',
      url: `${URL_API}listings/${offerId}/accept`,
      data: {
        type,
        price: price || null,
        text: description,
      },
    }).then((response) => {
      dispatch(acceptOfferSuccessful(response.data));
    }).catch((error) => {
      dispatch(acceptOfferFailed());
    });
  };
}
