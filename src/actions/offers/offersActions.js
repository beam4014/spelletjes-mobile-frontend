import axios from 'axios';
import * as types from './offersTypes';
import {URL_API} from "../url";

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
export function submitOffer() {
  return function (dispatch) {
    return axios.post(`${URL_API}`) //to be changed
      .then(response => dispatch(submitOfferSuccessful(response.data)))
      .catch(error => dispatch(submitOfferFailed()));
  };
}
