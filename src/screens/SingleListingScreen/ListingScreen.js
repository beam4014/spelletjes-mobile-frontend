import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import {ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, Alert, Button} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listingActions from '../../actions/listings/listingsActions';

class ListingScreen extends React.Component {
  constructor(props) {
    super(props);

    this.listing = this.props.listing;
    this.offers = this.props.listing.listingOffers.data;

    this.onPressEdit = this.onPressEdit.bind(this);
    this.onPressReport = this.onPressReport.bind(this);
  }
  onPressEdit(listing) {
    this.props.navigator.push({
      screen: 'screen.EditListingScreen',
      title: 'Edit',
      passProps: {
        listingId: listing.id,
        title: listing.title,
        type: listing.type,
        game: listing.game_id,
        price: listing.asking_price,
        description: listing.description,
      },
    });
  }
  onPressAcceptOffer(offer){

  }
  onPressOffer(listing) {
    this.props.navigator.showLightBox({
      screen: 'screen.SubmitOffer',
      passProps: {
        listingId: listing.id,
      },
      style: {
        backgroundBlur: 'dark',
        tapBackgroundToDismiss: true,
      },
    });
  }
  onPressReport() {
    this.props.navigator.showLightBox({
      screen: 'screen.Report',
      passProps: {
        listingId: this.listing.id,
      },
      style: {
        backgroundBlur: 'dark',
        tapBackgroundToDismiss: true,
      },
    });
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Image
          style={styles.headerImage}
          source={{ uri: 'http://images.vg247.com/current//2013/11/mario-party-island-tour-header-112313.jpg' }}
        />
        <View style={styles.content}>
          <Text style={styles.username}>{this.listing.user.data.name} ~ {this.listing.user.data.rating} points</Text>
          <View style={styles.top}>
            <Text style={styles.title}>{this.listing.title}</Text>
            <Text style={styles.type}>{this.listing.type.toUpperCase()}</Text>
          </View>
          {
            this.props.listing.asking_price
              ? <Text>{this.listing.asking_price} EUR</Text>
              : false
          }
          <Text style={styles.sectionLabel}>Description</Text>
          <Text>{this.props.listing.description}</Text>
          <View style={styles.offersContainer}>
            {
              this.offers.length > 0
                ? <Text style={styles.sectionLabel}>Offers</Text>
                : false
            }
            {
              _.map(this.offers, offer => (
                <View key={offer.id} style={styles.offerContainer}>
                  <View style={styles.top}>
                    <Text>
                      {offer.user.data.name.charAt(0).toUpperCase() + offer.user.data.name.slice(1)}
                       ~ {offer.user.data.rating} points
                    </Text>

                    <Text style={styles.typeInverse}>{offer.type.toUpperCase()}</Text>
                  </View>
                  {
                    offer.type === 'money'
                      ? <Text>{offer.price} EUR</Text>
                      : false
                  }
                  <Text>{offer.text}</Text>

                  <Text style={styles.date}>{moment(offer.created_at.data).fromNow()}</Text>
                  <TouchableOpacity
                    style={styles.acceptButtonContainer}
                    onPress={() => this.onPressAcceptOffer(offer)}
                  >
                    <Text style={styles.buttonText}>ACCEPT OFFER</Text>
                  </TouchableOpacity>
                  <View style = {styles.lineStyle} />
                </View>
              ))
            }
          </View>
          {
            this.props.authenticatedUser.id !== this.listing.user.id
              ? <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.onPressOffer(this.props.listing)}
              >
                <Text style={styles.buttonText}>OFFER</Text>
              </TouchableOpacity>
              : false
          }
          {
            this.props.authenticatedUser.id === this.listing.user.id
              ? <TouchableOpacity
                style={styles.editButtonContainer}
                underlayColor="blue"
                onPress={() => this.onPressEdit(this.props.listing)}
              >
                <Text style={styles.buttonText}>EDIT</Text>
              </TouchableOpacity>
              : false
          }
          {
            this.props.authenticatedUser.id !== this.listing.user.id
              ? <TouchableOpacity
                style={styles.reportButtonContainer}
                underlayColor="blue"
                onPress={() => this.onPressReport(this.props.listing.id)}
              >
                <Text style={styles.buttonText}>Report</Text>
              </TouchableOpacity>
              : false
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    margin: 20,
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  type: {
    color: '#e67e22',
    backgroundColor: '#fff',
    padding: 5,
  },
  typeInverse: {
    color: '#fff',
    backgroundColor: '#e67e22',
    padding: 5,
    fontSize: 12,
  },
  username:{
    marginTop: 5,
    marginBottom: 3,

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  offersContainer: {
    marginBottom: 10,
  },
  sectionLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000',
    marginTop: 5,
    marginBottom: 3,
  },
  offerContainer: {
    backgroundColor: '#fff',
    padding: 7,
    borderRadius: 5,
  },
  buttonContainer: {
    backgroundColor: '#0099ff',
    padding: 10,
    marginTop: 20,
  },
  editButtonContainer:{
    backgroundColor: '#cccc00',
    padding: 10,
    marginTop: 20,
  },
  acceptButtonContainer:{
    backgroundColor: '#841584',
    padding: 4,
    marginTop: 15,
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'black',
    margin:10,
  },
  reportButtonContainer:{
    backgroundColor: '#b30000',
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
  },
  headerImage: {
    width: '100%',
    height: 100,
  },
  date: {
    fontSize: 10,
  },
});

ListingScreen.propTypes = {
  listing: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  authenticatedUser: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    authenticatedUser: state.authentication.user,
    listingReported: state.listings.listingReported,
  };
}

export default connect(mapStateToProps)(ListingScreen);

