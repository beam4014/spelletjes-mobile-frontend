import { combineReducers } from 'redux';
import authentication from './authenticationReducer';
import listings from './listingsReducer';
import myListings from './myListingsReducer';
import offers from './offerReducer';


const appReducer = combineReducers({
  authentication,
  listings,
  myListings,
  offers,

});

export default appReducer;
