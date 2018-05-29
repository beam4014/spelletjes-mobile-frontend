import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash';
import { Alert, Text, StyleSheet, TextInput, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listingsActions from '../../actions/listings/listingsActions';

class SubmitListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      game_id: '',
      type: undefined,
      price: '',
      description: '',
    };
    this.onChangeTextTitle = this.onChangeTextTitle.bind(this);
    this.onChangeTextGameId = this.onChangeTextGameId.bind(this);
    this.onChangeTextType = this.onChangeTextType.bind(this);
    this.onChangeTextPrice = this.onChangeTextPrice.bind(this);
    this.onChangeTextDescription = this.onChangeTextDescription.bind(this);
    this.onSelectType = this.onSelectType.bind(this);
    this.onPressOffer = this.onPressSubmit.bind(this);
  }
  componentWillMount() {
    this.setState({
      type: this.props.type,
      title: this.props.title,
      game_id: this.props.game,
      price: this.props.price,
      description: this.props.description,
    });
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

  onPressSubmit() {
    this.setState({
      loading: true,
    });

    if (this.validate) {
      this.props.submitClicked(
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
    } else {
      Alert.alert('Please fill all the fields before submitting your listing.');
    }
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
      <KeyboardAwareScrollView style={styles.container}>
        <TextInput
          value={this.state.title}
          placeholder="Title"
          autoCorrect={false}
          underlineColorAndroid="orange"
          onChangeText={this.onChangeTextTitle}
          style={styles.input}
        />
        <TextInput
          value={this.state.game}
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
        {
          this.state.type !== 'trade'
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
          onPress={this.onPressSubmit}
        >
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
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
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    submittedListing: state.listings.submittedListing,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitOfferClicked: bindActionCreators(listingsActions.submitListing, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitListing);

