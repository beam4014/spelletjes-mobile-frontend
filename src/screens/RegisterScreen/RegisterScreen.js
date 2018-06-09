import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Alert, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import * as authenticationAction from '../../actions/authentication/authenticationActions';


class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: '',
      password: '',
      confirmPassword: '',
      email: '',
      phoneNumber: '',
    };
    this.onPressRegister = this.onPressRegister.bind(this);
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
    console.log(text);
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
    this.setState({ loading: !this.state.loading });
    setTimeout(() => {
      this.props.register(
        this.state.name,
        this.state.email,
        this.state.password,
        this.state.confirmPassword,
        this.state.phoneNumber
      ).then(() => {
        this.setState({ loading: !this.state.loading }); // stop showing loading
        // check if user is registered using the state registered in redux
        if (this.props.isRegistered) {
          setTimeout(() => {
            this.props.navigator.pop(); // go back to login page
            setTimeout(() => {
              Alert.alert(
                'Registration Successful',
                'Thank you for your registration. You may now login!',
              );
            }, 200); // show alert of successful registration
          }, 300);
        } else {
          Alert.alert(
            'Registration Unsuccessful',
            'Make sure you have filled out all fields correctly.',
          ); // show unsuccessful alert
        }
      });
    }, 400);
  }

  render() {
    if (this.state.loading) {
      return (
        <Spinner visible={this.state.loading} textContent="Registering" textStyle={{ color: '#e67e22' }} />
      );
    }
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.content}>
          <TextInput
            placeholder="Name"
            placeholderTextColor="rgba(255,255,255,0.7)"
            autoCorrect={false}
            underlineColorAndroid="rgba(0,0,0,0)"
            onChangeText={(text) => this.onChangeTextName(text)}
            style={styles.input}
            value={this.state.name}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.7)"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="rgba(0,0,0,0)"
            onChangeText={(text) => this.onChangeTextEmail(text)}
            style={styles.input}
            value={this.state.email}
          />
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="rgba(255,255,255,0.7)"
            keyboardType="numeric"
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="rgba(0,0,0,0)"
            onChangeText={(text) => this.onChangeTextPhoneNumber(text)}
            style={styles.input}
            value={this.state.phoneNumber}
          />
          <TextInput
            placeholderTextColor="rgba(255,255,255,0.7)"
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            onChangeText={(text) => this.onChangeTextPassword(text)}
            value={this.state.password}
          />
          <TextInput
            placeholderTextColor="rgba(255,255,255,0.7)"
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Confirm Password"
            secureTextEntry
            style={styles.input}
            onChangeText={(text) => this.onChangeTextConfirmPassword(text)}
            value={this.state.confirmPassword}
          />

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.onPressRegister}
            underlayColor="blue"
          >
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e67e22',
  },
  content: {
    // flex: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
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

function mapStateToProps(state) {
  return {
    isRegistered: state.authentication.registered,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    register: bindActionCreators(authenticationAction.register, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

