import * as types from '../actions/offers/offersTypes';

export default function offerReducer(state = {}, action) {
  switch (action.type) {
    case types.SUBMIT_OFFER_SUCCESSFUL:
      return Object.assign(
        {}
        ,
        state
        ,
        {
          offerSubmitted: true,
        },
      );
    case types.SUBMIT_OFFER_FAILED:
      return Object.assign(
        {}
        ,
        state
        ,
        {
          offerSubmitted: false,
        },
      );
    default:
      return state;
  }
}
