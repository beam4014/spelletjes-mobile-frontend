import { Navigation } from 'react-native-navigation';
import LoginScreen from '../screens/login/LoginScreen';
import ListingsScreen from '../screens/listings/ListingsScreen';
import ListingScreen from '../screens/listing/ListingScreen';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('screen.LoginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('screen.ListingsScreen', () => ListingsScreen, store, Provider);
  Navigation.registerComponent('screen.ListingScreen', () => ListingScreen, store, Provider);
}
