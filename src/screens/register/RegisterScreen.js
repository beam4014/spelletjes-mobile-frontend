import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import RegisterForm from "../../components/register/RegisterForm";
import * as authenticationAction from "../../actions/authentication/authenticationActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.onPressRegister = this.onPressRegister.bind(this);
  }

  onPressRegister(name, email, password, phoneNumber) {
    this.setState({loading: !this.state.loading});
    this.props.register(name, email, password, phoneNumber).then(() => {
      this.setState({loading: !this.state.loading}); // stop showing loading
      if (this.props.isRegistered) { // check if user is registered using the state registered in redux
        setTimeout(() => {
          this.props.navigator.pop(); // go back to login page
          setTimeout(() => {
            Alert.alert(
              'Registration Successful',
              'Thank you for your registration. You may now login!'
            )
          }, 200); // show alert of successful registration
        }, 300);
      } else {
        Alert.alert(
          'Registration Unsuccessful',
          'Make sure you have filled out all fields correctly.'
        ); // show unsuccessful alert
      }
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Spinner visible={this.state.loading} textContent="Registering" textStyle={{ color: '#e67e22' }} />
      );
    }
    return (
      <View style={styles.container}>
          <Text style={styles.title}>An app made for gamers</Text>
        <View style={styles.container}>
          <RegisterForm registerClicked={this.onPressRegister}/>
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
    flexGrow: 1,
    justifyContent: 'center',
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
});

function mapStateToProps(state) {
  return {
    isRegistered: state.authentication.register,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    register: bindActionCreators(authenticationAction.register, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

