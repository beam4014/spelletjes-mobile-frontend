import { combineReducers } from 'redux';
import authentication from './authenticationReducer';
import listings from './listingsReducer';

const appReducer = combineReducers({
  authentication,
  listings,
});

export default appReducer;
