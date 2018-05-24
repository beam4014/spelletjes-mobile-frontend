import { Navigation } from 'react-native-navigation';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import ListingsScreen from '../screens/ListingsScreen/ListingsScreen';
import ListingScreen from '../screens/SingleListingScreen/ListingScreen';
import MyListingScreen from '../screens/MyListingsScreen/MyListingsScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import SubmitListingsScreen from '../screens/ListingsScreen/SubmitListingsScreen';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('screen.LoginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('screen.ListingsScreen', () => ListingsScreen, store, Provider);
  Navigation.registerComponent('screen.ListingScreen', () => ListingScreen, store, Provider);
  Navigation.registerComponent('screen.MyListingsScreen', () => MyListingScreen, store, Provider);
  Navigation.registerComponent('screen.RegisterScreen', () => RegisterScreen, store, Provider);
  Navigation.registerComponent('screen.SubmitListingsScreen', () => SubmitListingsScreen, store, Provider);
}
