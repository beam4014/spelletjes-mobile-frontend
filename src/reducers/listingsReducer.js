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
          listingEdited: true,
        },
      );
    case types.EDIT_LISTING_FAILED:
      return Object.assign(
        {},
        state,
        {
          listingEdited: false,
        },
      );
    case types.LISTING_REPORT_SUCCESSFUL:
      return Object.assign(
        {},
        state,
        {
          listingReported: true,
        },
      );
    case types.LISTING_REPORT_FAILURE:
      return Object.assign(
        {},
        state,
        {
          listingReported: false,
        },
      );
    default:
      return state;
  }
}
