import { Navigation } from 'react-native-navigation';

export function startLogin() {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'screen.LoginScreen',
      navigatorStyle: {
        navBarHidden: true,
      },
    },
  });
}

export function startApp() {
  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'screen.ListingsScreen',
        label: 'Listings',
        icon: require('../images/icons/listings.png'),
      },
    ],
    initialRouteName: 'screen.ListingsScreen',
  });
}
