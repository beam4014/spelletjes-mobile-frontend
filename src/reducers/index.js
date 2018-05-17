import { combineReducers } from 'redux';
import authentication from './authenticationReducer';
import listings from './listingsReducer';
import myListings from './myListingsReducer';

const appReducer = combineReducers({
  authentication,
  listings,
  myListings,

});

export default appReducer;
