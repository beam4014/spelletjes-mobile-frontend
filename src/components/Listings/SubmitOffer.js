import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash';
import { Alert, Text, StyleSheet, TextInput, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as offersActions from '../../actions/offers/offersActions';

class SubmitOffer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'money', // money or game
      price: '',
      description: '',
    };
    this.onChangeTextType = this.onChangeTextType.bind(this);
    this.onChangeTextPrice = this.onChangeTextPrice.bind(this);
    this.onChangeTextDescription = this.onChangeTextDescription.bind(this);
    this.onSelectType = this.onSelectType.bind(this);
    this.onPressOffer = this.onPressOffer.bind(this);
  }
  onChangeTextType(text) {
    this.setState({
      type: text,
    });
  }

  onChangeTextPrice(text) {
    this.setState({
      price: text,
    });
  }

  onChangeTextDescription(text) {
    this.setState({
      description: text,
    });
  }

  onSelectType(type) {
    this.setState({
      type,
    });
  }

  onPressOffer() {
    this.setState({
      loading: true,
    });

    if (this.validate) {
      this.props.submitOfferClicked(
        this.props.listingId,
        this.state.price,
        this.state.type,
        this.state.description,
      ).then(() => {
        this.setState({
          loading: false,
        });
        if (this.props.submittedOfferToListing) {
          setTimeout(() => {
            this.props.navigator.dismissLightBox();
            Alert.alert('You have successfully submitted an offer!');
          }, 300);
        } else {
          Alert.alert('Failed');
        }
      });
    } else {
      Alert.alert('Please fill all the fields before submitting an offer.');
    }
  }

  validate() {
    if (_.isEmpty(this.state.price) || !_.isNumber(this.state.price)) {
      return false;
    } else if (_.isEmpty(this.state.description)) {
      return false;
    } else if (_.isEmpty(this.state.type)) {
      return false;
    }
    return true;
  }

  render() {
    if (this.state.loading) {
      return (
        <Spinner
          visible={this.state.loading}
          textContent="Submitting"
          color="white"
          overlayColor="orange"
        />
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.typesContainer}>
            <TouchableOpacity
              onPress={() => this.onSelectType('money')}
              style={[
                styles.typeButton,
                this.state.type === 'money'
                  ? styles.typeButtonSelected
                  : false,
              ]}
            >
              <Text style={styles.typeText}>
                Sell
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onSelectType('game')}
              style={[
                styles.typeButton,
                this.state.type === 'game'
                  ? styles.typeButtonSelected
                  : false,
              ]}
            >
              <Text style={styles.typeText}>
                Game
              </Text>
            </TouchableOpacity>
          </View>
          {
            this.state.type !== 'game'
              ? <TextInput
                value={this.state.price}
                underlineColorAndroid="orange"
                placeholder="Price"
                style={styles.input}
                onChangeText={this.onChangeTextPrice}
              />
              : false
          }
          <TextInput
            value={this.state.description}
            multiline
            underlineColorAndroid="orange"
            placeholder="Description"
            numberOfLines={4}
            style={[styles.input, styles.descriptionInput]}
            onChangeText={this.onChangeTextDescription}
            blurOnSubmit={false}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            underlayColor="blue"
            onPress={this.onPressOffer}
          >
            <Text style={styles.buttonText}>Submit Offer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 10,
    backgroundColor: '#fff',
    height: 300,
  },
  input: {
    height: 40,
  },
  descriptionInput: {
    height: 100,
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
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  typeButton: {
    backgroundColor: '#ccc',
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
  },
  typeText: {
    color: '#fff',
  },
  typeButtonSelected: {
    backgroundColor: 'orange',
  },
});


SubmitOffer.propTypes = {
  submitOfferClicked: PropTypes.func.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    submittedOfferToListing: state.offers.offerSubmitted,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitOfferClicked: bindActionCreators(offersActions.submitOffer, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitOffer);

