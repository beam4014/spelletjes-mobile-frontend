import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import LoginForm from '../../components/Login/LoginForm';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.onPressGoToRegisterScreen = this.onPressGoToRegisterScreen.bind(this);
  }

  onPressGoToRegisterScreen() {
    this.props.navigator.push({
      screen: 'screen.RegisterScreen',
      title: 'Register',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../images/logo.png')}
          />
          <Text style={styles.title}>An app made for gamers</Text>
        </View>
        <View style={styles.container}>
          <LoginForm />
          <TouchableOpacity
            style={styles.registerButton}
            onPress={this.onPressGoToRegisterScreen}
          >
            <Text style={styles.registerButtonText}>
              Don't have an account yet? Register!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e67e22',
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  logo: {
    width: 120,
    height: 100,
  },
  title: {
    color: '#FFF',
    marginTop: 10,
    width: 160,
    textAlign: 'center',
    opacity: 0.7,
  },
  registerButton: {
    padding: 10,
    backgroundColor: '#ccc',
  },
  registerButtonText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
  },
});
