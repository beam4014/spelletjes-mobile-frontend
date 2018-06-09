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
        title: 'Listings',
        icon: require('../images/icons/listings.png'),
      },
      {
        screen: 'screen.SubmitListingsScreen',
        title: 'Submit Listing',
        icon: require('../images/icons/submit_Listing.png'),
      },
      {
        screen: 'screen.MyListingsScreen',
        title: 'My Listings',
        icon: require('../images/icons/my-listing.png'),
      },
    ],
    initialRouteName: 'screen.ListingsScreen',
  });
}
