/* eslint-disable react/prop-types */
import React from 'react';
import { Alert, Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listingsAction from '../../actions/myListings/myListingsActions';
import ListingsList from '../../components/listings/ListingsList';
import { startLogin } from '../../navigation/AppNavigator';

class MyListingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
    };
    this.onPressLogout = this.onPressLogout.bind(this);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.props.navigator.setButtons({
      rightButtons: [{
        title: 'Logout',
        id: 'logout',
      }],
    });
  }
  componentDidMount() {
    this.props.fetchMyListings().then(() => {
      if (this.props.listings.data.length > 0) {
        this.setState({
          listings: this.props.listings.data,
        });
      }
    });
  }
  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'logout') {
        //  Logout function
        Alert.alert(
          'Logout',
          'Do you wish to logout',
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => this.onPressLogout() },
          ],
          { cancelable: false },
        );
      }
    }

  }
  onPressLogout() {
    AsyncStorage.clear();
    startLogin();
  }

  render() {
    if (this.state.listings.length > 0) {
      return (
        <View style={styles.container}>
          <ListingsList navigator={this.props.navigator} listings={this.state.listings} />
        </View>
      );
    }
    return (
      <View>
        <Text>No listings found...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function mapStateToProps(state) {
  return {
    listings: state.myListings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMyListings: bindActionCreators(listingsAction.fetchMyListing, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyListingsScreen);
