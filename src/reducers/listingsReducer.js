import * as types from '../actions/listings/listingsTypes';

export default function fetchListingReducer(state = {}, action) {
  switch (action.type) {
    case types.FETCH_LISTING_SUCCESSFUL:
      return Object.assign(
        {},
        state,
        {
          data: action.data.data,
        },
      );
    case types.FETCH_LISTING_FAILED:
      return Object.assign(
        {},
        state,
        {
          data: [],
        },
      );
    case types.SUBMIT_LISTING_SUCCESSFUL:
      return Object.assign(
        {},
        state,
        {
          submittedListing: true,
        },
      );
    case types.SUBMIT_LISTING_FAILED:
      return Object.assign(
        {},
        state,
        {
          submittedListing: false,
        },
      );
    case types.EDIT_LISTING_SUCCESSFUL:
      return Object.assign(
        {},
        state,
        {
          data: action.data.data,
        },
      );
    case types.EDIT_LISTING_FAILED:
      return Object.assign(
        {},
        state,
        {
          data: [],
        },
      );
    default:
      return state;
  }
}
