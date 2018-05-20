import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

class SubmitListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      game_id: null,
      type: null,
      price: null,
      description: null,
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
    this.props.submitClicked(
      this.state.title,
      this.state.game_id,
      this.state.type,
      this.state.price,
      this.state.description,
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="title"
          placeholderTextColor="rgba(255,255,255,0.7)"
          autoCorrect={false}
          underlineColorAndroid="rgba(0,0,0,0)"
          onChangeText={this.onChangeTextTitle}
          style={styles.input}
        />
        <TextInput
          placeholderTextColor="rgba(255,255,255,0.7)"
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="game id"
          style={styles.input}
          onChangeText={this.onChangeTextGameId}
        />
        <TextInput
          placeholderTextColor="rgba(255,255,255,0.7)"
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="type"
          style={styles.input
          }
          onChangeText={this.onChangeTextType
          }
        />
        <TextInput
          placeholderTextColor="rgba(255,255,255,0.7)"
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="price"
          style={styles.input}
          onChangeText={this.onChangeTextPrice}
        />
        <TextInput
          placeholderTextColor="rgba(255,255,255,0.7)"
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="description"
          style={styles.input
          }
          onChangeText={this.onChangeTextDescription
          }
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          underlayColor="blue"
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
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'red',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#34495e',
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: '700',
  },

});


SubmitListing.propTypes = {
  submitClicked: PropTypes.func.isRequired,
};


export default SubmitListing;
