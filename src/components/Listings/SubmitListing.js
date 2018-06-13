import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Alert, Text, StyleSheet, TextInput, TouchableOpacity, View, Picker } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listingsActions from '../../actions/listings/listingsActions';

class SubmitListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      game_id: undefined,
      type: 'sell',
      secondaryType: undefined,
      price: undefined,
      description: '',
      selectedGame: 0,
      selectedGameIndex: 0,
      descriptionTotalCharacters: 0,
    };
    this.onChangeTextTitle = this.onChangeTextTitle.bind(this);
    this.onChangeTextType = this.onChangeTextType.bind(this);
    this.onChangeTextPrice = this.onChangeTextPrice.bind(this);
    this.onChangeTextDescription = this.onChangeTextDescription.bind(this);
    this.onSelectType = this.onSelectType.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.onSelectGame = this.onSelectGame.bind(this);
  }
  onChangeTextTitle(text) {
    this.setState({
      title: text,
    });
  }
  onSelectGame(gameId, itemIndex) {
    this.setState({
      game_id: gameId,
      selectedGame: gameId,
      selectedGameIndex: itemIndex,
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
    const textLength = text.length;
    this.setState({
      description: text,
      descriptionTotalCharacters: textLength,
    });
  }

  onSelectType(type) {
    this.setState({
      type,
    });
  }
  onSelectSecondaryType(secondaryType) {
    if (secondaryType === this.state.secondaryType) {
      this.setState({
        secondaryType: undefined,
      });
    } else {
      this.setState({
        secondaryType,
      });
    }
  }

  onPressSubmit() {
    if (this.validate()) {
      this.props.submitClicked(
        this.state.title,
        this.state.selectedGame,
        this.props.games[this.state.selectedGameIndex].name,
        this.props.games[this.state.selectedGameIndex].cover.url,
        this.state.type,
        this.state.secondaryType,
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
    } else if (this.state.type === 'sell') {
      if (_.isEmpty(this.state.price)) {
        return false;
      }
    }

    return true;
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.content}>
          <TextInput
            value={this.state.title}
            placeholder="Title"
            autoCorrect={false}
            underlineColorAndroid="orange"
            onChangeText={this.onChangeTextTitle}
            style={styles.input}
          />
          <Picker
            selectedValue={this.state.selectedGame}
            onValueChange={(itemValue, itemIndex) => this.onSelectGame(itemValue, itemIndex)}
          >
            {
              _.map(this.props.games, game => (
                <Picker.Item key={game.id} label={game.name} value={game.id} />
                ))
            }
          </Picker>
          <Text>Type</Text>
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
            this.state.type !== 'buy'
              ? <Text>Secondary Type (optional)</Text>
              : false
          }
          {
            this.state.type !== 'buy'
              ? <View style={styles.typesContainer}>
                <TouchableOpacity
                  onPress={() => this.onSelectSecondaryType('sell')}
                  style={[
                    styles.typeButton,
                    this.state.secondaryType === 'sell'
                      ? styles.secondaryTypeButtonSelected
                      : false,
                  ]}
                >
                  <Text style={styles.typeText}>
                    Sell
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onSelectSecondaryType('trade')}
                  style={[
                    styles.typeButton,
                    this.state.secondaryType === 'trade'
                      ? styles.secondaryTypeButtonSelected
                      : false,
                  ]}
                >
                  <Text style={styles.typeText}>
                    Trade
                  </Text>
                </TouchableOpacity>
              </View>
              : false
          }
          {
            this.state.type !== 'trade'
              ? <TextInput
                value={this.state.price}
                keyboardType="numeric"
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
            maxLength={500}
          />
          <Text style={styles.descriptionTotal}>{this.state.descriptionTotalCharacters} / 500</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            underlayColor="blue"
            onPress={this.onPressSubmit}
          >
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    margin: 20,
  },
  input: {
    height: 40,
    padding: 10,
    backgroundColor: 'orange',
    marginBottom: 10,
    borderRadius: 5,
    color: 'white',
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
    justifyContent: 'space-around',
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
  secondaryTypeButtonSelected: {
    backgroundColor: 'purple',
  },
  descriptionTotal: {
    textAlign: 'right',
    color: '#000',
    fontSize: 12,
  },
});


SubmitListing.propTypes = {
  submitClicked: PropTypes.func.isRequired,
};

export default SubmitListing;

