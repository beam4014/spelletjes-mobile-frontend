/* eslint-disable react/prop-types */
import React from 'react';
import { Text, View, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listingsAction from '../../actions/listings/listingsActions';
import {setAxiosToken} from '../../actions/authentication/authenticationActions';
import ListingsList from '../../components/Listings/ListingsList';

const actions = [{
  text: 'Language',
  icon: require('../../../src/images/icons/listings.png'),
  name: 'bt_language',
  position: 1,
}];

class ListingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
    };
  }

  componentDidMount() {
    try {
      AsyncStorage.getItem('@spelletjes/token', (err, token) => {
        if (!err) {
          if (token !== null) {
            setAxiosToken(token);
          }
        }
      });
    } catch (error) {
      Alert.alert('Something went wrong. Please try again...');
      console.log(error);
    }
    this.props.fetchListings().then(() => {
      if (this.props.listings.data.length > 0) {
        this.setState({
          listings: this.props.listings.data,
        });
      }
    });
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
        <Text>No listings found..</Text>
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
    listings: state.listings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchListings: bindActionCreators(listingsAction.fetchListing, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingsScreen);
