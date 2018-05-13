import {createStore, applyMiddleware, compose} from 'redux';
import appReducer from '../reducers/index';
import invariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


export default function configureStore(initialState) {
    return createStore(
        appReducer,
        initialState,
        applyMiddleware(thunk, invariant()),
        // composeWithDevTools(applyMiddleware(thunk, reduxImmutableStateInavirian())),
    );
}