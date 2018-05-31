import * as types from '../actions/myListings/myListingsTypes';

export default function fetchMyListingReducer(state = {}, action) {
  switch (action.type) {
    case types.FETCH_MYLISTING_SUCCESSFUL:
      return Object.assign(
        {},
        state,
        {
          data: action.data.data,
        },
      );
    case types.FETCH_MYLISTING_FAILED:
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
