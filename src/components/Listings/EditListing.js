import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Alert, Text, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listingsActions from '../../actions/listings/listingsActions';

class EditListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Luigi and his brother',
      game_id: '5',
      type: 'sell',
      price: 22,
      description: 'It\'s and old game where his brother wears red.',
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

  onPressSubmit() {
    console.log(this.validate());
    if (this.validate()) {
      this.props.submitClicked(
        this.state.title,
        this.state.price,
        this.state.description,
      );
    } else {
      Alert.alert('Please fill all the fields before submitting your listing.');
    }
  }

  validate() {
    console.log(this.state);
    if (_.isEmpty(this.state.title)) {
      return false;
    } else if (_.isEmpty(this.state.description)) {
      return false;
    } else if (_.isEmpty(this.state.type)) {
      return false;
    } else if (_.isEmpty(this.state.game_id)) {
      return false;
    } else if (_.isEmpty(this.state.price)) {
      return false;
    }

    return true;
  }

  render() {
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
        {
          this.state.type !== 'trade'
            ? <TextInput
              value={this.state.price}
              keyboardType={'numeric'}
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
          <Text style={styles.buttonText}>Submit</Text>
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


EditListing.propTypes = {
  submitClicked: PropTypes.func.isRequired,
};

export default EditListing;
