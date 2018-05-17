import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';


class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      password: null,
      confirmPassword: null,
      email: null,
      phoneNumber: null,
    };
    this.onChangeTextName = this.onChangeTextName.bind(this);
    this.onChangeTextPassword = this.onChangeTextPassword.bind(this);
    this.onChangeTextConfirmPassword = this.onChangeTextConfirmPassword.bind(this);
    this.onChangeTextEmail = this.onChangeTextEmail.bind(this);
    this.onChangeTextPhoneNumber = this.onChangeTextPhoneNumber.bind(this);
    this.onPressRegister = this.onPressRegister.bind(this);
  }
  onChangeTextName(text) {
    this.setState({
      name: text,
    });
  }
  onChangeTextPassword(text) {
    this.setState({
      password: text,
    });
  }
  onChangeTextConfirmPassword(text) {
    this.setState({
      confirmPassword: text,
    });
  }
  onChangeTextEmail(text) {
    this.setState({
      email: text,
    });
  }
  onChangeTextPhoneNumber(text) {
    this.setState({
      phoneNumber: text,
    });
  }
  onPressRegister() {
    this.props.registerClicked(
      this.state.name,
      this.state.email,
      this.state.password,
      this.state.confirmPassword,
      this.state.phoneNumber,
    );
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <TextInput
          placeholder="name"
          placeholderTextColor="rgba(255,255,255,0.7)"
          autoCorrect={false}
          underlineColorAndroid="rgba(0,0,0,0)"
          onChangeText={this.onChangeTextName}
          style={styles.input}
        />
        <TextInput
          placeholderTextColor="rgba(255,255,255,0.7)"
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="password"
          secureTextEntry
          style={styles.input}
          onChangeText={this.onChangeTextPassword}
        />
        <TextInput
          placeholderTextColor="rgba(255,255,255,0.7)"
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="confirm password"
          secureTextEntry
          style={styles.input}
          onChangeText={this.onChangeTextConfirmPassword}
        />
        <TextInput
          placeholder="email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="rgba(0,0,0,0)"
          onChangeText={this.onChangeTextEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="phone number"
          placeholderTextColor="rgba(255,255,255,0.7)"
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="rgba(0,0,0,0)"
          onChangeText={this.onChangeTextPhoneNumber}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onPressRegister}
          underlayColor="blue"
        >
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e67e22',
    margin: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#34495e',
    padding: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700',
  },

});

RegisterForm.propTypes = {
  registerClicked: PropTypes.func.isRequired,
};


export default RegisterForm;
