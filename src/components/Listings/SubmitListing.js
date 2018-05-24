import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Alert, Text, StyleSheet, TextInput, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listingsActions from '../../actions/listings/listingsActions';
import Spinner from 'react-native-loading-spinner-overlay';

class SubmitListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      game_id: '',
      type: '',
      price: '',
      description: '',
    };
    this.onChangeTextTitle = this.onChangeTextTitle.bind(this);
    this.onChangeTextGameId = this.onChangeTextGameId.bind(this);
    this.onChangeTextType = this.onChangeTextType.bind(this);
    this.onChangeTextPrice = this.onChangeTextPrice.bind(this);
    this.onChangeTextDescription = this.onChangeTextDescription.bind(this);
    this.onSelectType = this.onSelectType.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
  }

  onChangeTextTitle(text) {
    this.setState({
      title: text,
    });
  }

  onChangeTextGameId(text) {
    this.setState({
      game_id: text,
    });
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

  validate() {
    if (_.isEmpty(this.state.title)) {
      return false;
    } else if (_.isEmpty(this.state.price) || !_.isNumber(this.state.price)) {
      return false;
    } else if (_.isEmpty(this.state.description)) {
      return false;
    } else if (_.isEmpty(this.state.type)) {
      return false;
    }
  }

  onPressSubmit() {
    this.setState({
      loading: true,
    });
    if (this.validate) {
      try {
        AsyncStorage.getItem('@spelletjes/token', (err, token) => {
          if (!err) {
            if (token !== null) {
              this.props.submitClicked(
                token,
                this.state.title,
                this.state.game_id,
                this.state.type,
                this.state.price,
                this.state.description,
              ).then(() => {
                this.setState({
                  loading: false,
                });
                if (this.props.submittedListing) {
                  setTimeout(() => {
                    Alert.alert('You have successfully submitted your listing!');
                  }, 300);
                } else {
                  Alert.alert('Failed');
                }
              });
            }
          }
        });
      } catch (error) {
        Alert.alert('Something went wrong. Please try again...');
        console.log(error);
      }
    } else {
      Alert.alert('Please fill all the fields before submitting your listing.');
    }
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
        <TextInput
          placeholder="Title"
          autoCorrect={false}
          underlineColorAndroid="orange"
          onChangeText={this.onChangeTextTitle}
          style={styles.input}
        />
        <TextInput
          underlineColorAndroid="orange"
          placeholder="Game"
          style={styles.input}
          onChangeText={this.onChangeTextGameId}
        />
        <View style={styles.typesContainer}>
          <TouchableOpacity
            onPress={() => this.onSelectType('sell')}
            style={[
              styles.typeButton,
              this.state.type === 'sell'
                ? styles.typeButtonSelected
                : false,
            ]}
          >
            <Text style={styles.typeText}>
              Sell
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onSelectType('trade')}
            style={[
              styles.typeButton,
              this.state.type === 'trade'
              ? styles.typeButtonSelected
                : false,
            ]}
          >
            <Text style={styles.typeText}>
              Trade
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onSelectType('buy')}
            style={[
              styles.typeButton,
              this.state.type === 'buy'
                ? styles.typeButtonSelected
                : false,
            ]}
          >
            <Text style={styles.typeText}>
              Buy
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          underlineColorAndroid="orange"
          placeholder="Price"
          style={styles.input}
          onChangeText={this.onChangeTextPrice}
        />
        <TextInput
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
          onPress={this.onPressSubmit}
        >
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
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


SubmitListing.propTypes = {
  submitClicked: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    submittedListing: state.listings.submittedListing,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitClicked: bindActionCreators(listingsActions.submitListing, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitListing);

