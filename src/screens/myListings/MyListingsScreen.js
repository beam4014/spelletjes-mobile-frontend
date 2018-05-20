/* eslint-disable react/prop-types */
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listingsAction from '../../actions/myListings/myListingsActions';
import ListingsList from '../../components/listings/ListingsList';

class MyListingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
    };
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
  render() {
    if (this.state.listings.length > 0) {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.floatingButton}
          >
            <Text>123</Text>
          </TouchableOpacity>
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
  floatingButton: {

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
