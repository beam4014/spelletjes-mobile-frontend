import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class ListingScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.listing);
    this.onPressEdit = this.onPressEdit.bind(this);
  }
  onPressEdit(listing) {
    this.props.navigator.push({
      screen: 'screen.EditListingScreen',
      passProps: {
        title: listing.title,
        type: listing.type,
        game: listing.game_id,
        price: listing.asking_price,
        description: listing.description,
      },
    });
  }
  onPressOffer(listing) {
    this.props.navigator.showLightBox({
      screen: 'screen.SubmitOfferScreen',
      passProps: {
        listingId: listing.id,
      },
      style: {
        backgroundBlur: 'dark', // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
        backgroundColor: 'white', // tint color for the background, you can specify alpha here (optional)
        tapBackgroundToDismiss: true, // dismisses LightBox on background taps (optional)
      },
      adjustSoftInput: 'resize', // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
    });
  }

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
              <View key={offer.id} style={styles.offerContainer}>
                <Text>User: {offer.user_id}</Text>
                <Text>Offer Type: {offer.type}</Text>
                <Text>{offer.text}</Text>
                <Text>{moment(offer.created_at).fromNow()}</Text>
              </View>
              ))
          }
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          underlayColor="blue"
          onPress={() => this.onPressOffer(this.props.listing)}
        >
          <Text style={styles.buttonText}>OFFER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          underlayColor="blue"
          onPress={() => this.onPressEdit(this.props.listing)}
        >
          <Text style={styles.buttonText}>EDIT</Text>
        </TouchableOpacity>
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
  buttonContainer: {
    backgroundColor: '#34495e',
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
  },
});

ListingScreen.propTypes = {
  listing: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};

export default ListingScreen;
