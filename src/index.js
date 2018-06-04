import { AsyncStorage, YellowBox } from 'react-native';
import { Provider } from 'react-redux';

import configureStore from '../src/store/configureStore';

import { registerScreens } from '../src/navigation/screens';
import { startApp, startLogin } from '../src/navigation/AppNavigator';
import {setAxiosToken} from "./actions/authentication/authenticationActions";

// These will still be logged out to Developer Tools
YellowBox.ignoreWarnings([
  // Will be fixed in 0.56.x
  'Class RCTCxxModule was not exported',
  // Will be fixed in 0.56.x
  'Module RCTImageLoader requires main queue setup',
]);

console.disableYellowBox = true;

const store = configureStore();

registerScreens(store, Provider);

async function initializeApp() {
  AsyncStorage.clear();
  const token = await AsyncStorage.getItem('@spelletjes/token');
  if (!token) {
    startLogin();
  } else {
    setAxiosToken(token);
    startApp();
  }
}

initializeApp();
