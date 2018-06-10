/* eslint-disable react/prop-types */
import React from 'react';
import _ from 'lodash';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listingsAction from '../../actions/listings/listingsActions';
import * as authenticationActions from '../../actions/authentication/authenticationActions';
import ListingsList from '../../components/Listings/ListingsList';
import Tabs from './Tabs';


class ListingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      listingsSell: [],
      listingsBuy: [],
      listingsTrade: [],
    };
    this.sortListingsByGenre = this.sortListingsByGenre.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem('@spelletjes/token').then((token) => {
      this.props.getAuthenticatedUserData(token);
    });
    this.props.getUserVerificationStatus().then(() => {
      if (!this.props.verified) {
        this.props.navigator.showModal({
          screen: 'screen.SmsVerificationScreen',
        });
      }
    });
    this.props.fetchListings().then(() => {
      if (this.props.listings.data.length > 0) {
        this.setState({
          listings: this.props.listings.data,
        });
        this.sortListingsByGenre();
      }
    });
  }
  sortListingsByGenre() {
    const sell = _.filter(this.state.listings, { type: 'sell' });
    const trade = _.filter(this.state.listings, { type: 'trade' });
    const buy = _.filter(this.state.listings, { type: 'buy' });
    this.setState({
      listingsSell: sell,
      listingsBuy: buy,
      listingsTrade: trade,
    });
  }
  render() {
    if (this.state.listings.length > 0) {
      return (
        <View style={styles.container}>
          <Tabs>
            {/* First tab */}
            <View title="SELL" style={styles.content}>
              <ListingsList navigator={this.props.navigator} listings={this.state.listingsSell} />
            </View>
            {/* Second tab */}
            <View title="TRADE" style={styles.content}>
              <ListingsList navigator={this.props.navigator} listings={this.state.listingsTrade} />
            </View>
            {/* Third tab */}
            <View title="BUY" style={styles.content}>
              <ListingsList navigator={this.props.navigator} listings={this.state.listingsBuy} />
            </View>

          </Tabs>
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
  content: {
    flex: 1,
  },
});

function mapStateToProps(state) {
  return {
    listings: state.listings,
    user: state.authentication.user,
    verified: state.authentication.verified,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchListings: bindActionCreators(listingsAction.fetchListing, dispatch),
    getAuthenticatedUserData: bindActionCreators(authenticationActions.getAuthenticatedUserData, dispatch),
    getUserVerificationStatus: bindActionCreators(authenticationActions.getUserVerificationStatus, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingsScreen);
