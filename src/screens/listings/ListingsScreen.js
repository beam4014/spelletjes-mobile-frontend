/* eslint-disable react/prop-types */
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listingsAction from '../../actions/listings/listingsActions';
import ListingsList from '../../components/listings/ListingsList';

class ListingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
    };
  }

  componentDidMount() {
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
      <Text>No listings found..</Text>
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
