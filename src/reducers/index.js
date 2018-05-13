import {combineReducers} from 'redux';
import authentication from  './authenticationReducer.js'

const appReducer = combineReducers({
    authentication,
});

export default appReducer;