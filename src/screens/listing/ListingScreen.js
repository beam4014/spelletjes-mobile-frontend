import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

class ListingScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>{this.props.listing.title}</Text>
        <Text>{this.props.listing.type}</Text>
        <Text>{this.props.listing.asking_price}</Text>
        <Text>{this.props.listing.description}</Text>

        <View style={styles.offersContainer}>
          <Text style={styles.header}>Offers</Text>
          {
            _.map(this.props.listing.offers, offer => (
              <View style={styles.offerContainer}>
                <Text>User: {offer.user_id}</Text>
                <Text>Offer Type: {offer.type}</Text>
                <Text>{offer.text}</Text>
                <Text>{moment(offer.created_at).fromNow()}</Text>
              </View>
              ))
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  offersContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    fontSize: 15,
    color: '#000',
  },
  offerContainer: {
    backgroundColor: '#ccc',
    padding: 5,
  },
});

ListingScreen.propTypes = {
  listing: PropTypes.object.isRequired,
};

export default ListingScreen;
