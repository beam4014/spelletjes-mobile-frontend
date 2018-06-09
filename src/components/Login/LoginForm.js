import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Text, Alert, AsyncStorage, TextInput, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { startApp } from '../../navigation/AppNavigator';
import _ from 'lodash';

import * as authenticationAction from '../../actions/authentication/authenticationActions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: '',
      password: '',
    };

    this.onChangeTextPassword = this.onChangeTextPassword.bind(this);
    this.onChangeTextUsername = this.onChangeTextUsername.bind(this);
    this.onPressLogin = this.onPressLogin.bind(this);
  }

  onChangeTextUsername(text) {
    this.setState({
      username: text,
    });
  }
  onChangeTextPassword(text) {
    this.setState({
      password: text,
    });
  }
  onPressLogin() {
    this.setState({
      loading: true,
    });
    this.props.login(this.state.username, this.state.password)
      .then(() => {
        this.setState({
          loading: false,
        });
        if (this.props.token) {
          AsyncStorage.setItem('@spelletjes/token', this.props.token);
          startApp();
        } else {
          Alert.alert('Something went wrong. Please try again...');
        }
      });
  }
  render() {
    if (this.state.loading) {
      return (
        <Spinner
          visible={this.state.loading}
          textContent="Logging in"
          color="#FFFFFF"
          overlayColor="#e67e22"
        />
      );
    }

    return (
      <KeyboardAwareScrollView style={styles.container}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="rgba(0,0,0,0)"
          onChangeText={this.onChangeTextUsername}
          style={styles.input}
          value={this.state.username}
          ref={(ref) => this.textInputEmail = ref}
        />
        <TextInput
          placeholderTextColor="rgba(255,255,255,0.7)"
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={this.state.password}
          onChangeText={this.onChangeTextPassword}
          ref={(ref) => this.textInputPassword = ref}
        />
        <TouchableOpacity
          disabled={_.isEmpty(this.state.username) || _.isEmpty(this.state.password)}
          style={styles.buttonContainer}
          onPress={this.onPressLogin}
          underlayColor="blue"
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <Text>
          {this.state.username} {this.state.password}
        </Text>
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

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    token: state.authentication.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(authenticationAction.authenticate, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
