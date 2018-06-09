import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import invariant from 'redux-immutable-state-invariant';
import appReducer from '../reducers/index';

export default function configureStore(initialState) {
  return createStore(
    appReducer,
    initialState,
  //   applyMiddleware(thunk, invariant()),
    composeWithDevTools(applyMiddleware(thunk, invariant())),
  );
}
