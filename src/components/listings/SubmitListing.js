import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Text, StyleSheet, TextInput, TouchableOpacity, View, AsyncStorage,} from 'react-native';
import * as authenticationAction from "../../actions/authentication/authenticationActions";
import {bindActionCreators} from "redux";
import * as listingsActions from "../../actions/listings/listingsActions";
import {connect} from "react-redux";
import listings from "../../reducers/listingsReducer";

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

  onPressSubmit() {
    try {
      AsyncStorage.getItem('@spelletjes/token', (err, token) => {
        if (!err) {
          if (token !== null) {
            this.props.submitClicked(token
            ,      this.state.title,
              this.state.game_id,
              this.state.type,
              this.state.price,
              this.state.description,).then(() => {
            });
          }
        }
      });
      Alert.alert('Successfully submitted');
    } catch (error) {
      Alert.alert('Something went wrong. Please try again...');
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="title"
          placeholderTextColor="blue"
          autoCorrect={false}
          underlineColorAndroid="orange"
          onChangeText={this.onChangeTextTitle}
          style={styles.input}
        />
        <TextInput
          placeholderTextColor="blue"
          underlineColorAndroid="orange"
          placeholder="game id"
          style={styles.input}
          onChangeText={this.onChangeTextGameId}
        />
        <TextInput
          placeholderTextColor="blue"
          underlineColorAndroid="orange"
          placeholder="type"
          style={styles.input
          }
          onChangeText={this.onChangeTextType
          }
        />
        <TextInput
          placeholderTextColor="blue"
          underlineColorAndroid="orange"
          placeholder="price"
          style={styles.input}
          onChangeText={this.onChangeTextPrice}
        />
        <TextInput
          placeholderTextColor="blue"
          underlineColorAndroid="orange"
          placeholder="description"
          style={styles.input
          }
          onChangeText={this.onChangeTextDescription
          }
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
    backgroundColor: 'grey',
    paddingVertical: 10,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'black',
    paddingHorizontal: 10,
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

