import { Navigation } from 'react-native-navigation';
import LoginScreen from '../screens/login/LoginScreen';
import ListingsScreen from '../screens/listings/ListingsScreen';
import ListingScreen from '../screens/listing/ListingScreen';
import MyListingScreen from '../screens/myListings/MyListingsScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import SubmitListingsScreen from "../screens/listings/SubmitListingsScreen";

export function registerScreens(store, Provider) {
  Navigation.registerComponent('screen.LoginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('screen.ListingsScreen', () => ListingsScreen, store, Provider);
  Navigation.registerComponent('screen.ListingScreen', () => ListingScreen, store, Provider);
  Navigation.registerComponent('screen.MyListingsScreen', () => MyListingScreen, store, Provider);
  Navigation.registerComponent('screen.RegisterScreen', () => RegisterScreen, store, Provider);
  Navigation.registerComponent('screen.SubmitListingsScreen', () => SubmitListingsScreen, store, Provider);
}
