import React from 'react';
import ListView from 'react-native-controlled-listview';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import ListingRow from './ListingRow';

class ListingsList extends React.Component {
  constructor(props) {
    super(props);

    this.onPressListing = this.onPressListing.bind(this);
  }
  onPressListing(listing) {
    this.props.navigator.push({
      screen: 'screen.ListingScreen',
      passProps: {
        listing,
      },
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView
          items={this.props.listings}
          renderRow={
            listing =>
              (<ListingRow
                listing={listing}
                onPress={() => this.onPressListing(listing)}
              />)
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});

ListingsList.propTypes = {
  listings: PropTypes.array.isRequired,
  navigator: PropTypes.object.isRequired,
};

export default ListingsList;
