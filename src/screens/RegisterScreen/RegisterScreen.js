import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import RegisterForm from '../../components/Register/RegisterForm';
import * as authenticationAction from '../../actions/authentication/authenticationActions';

import { StyleSheet, Text, View, Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.onPressRegister = this.onPressRegister.bind(this);
  }

  onPressRegister(name, email, password, passwordConfirmation, phoneNumber) {
    this.setState({ loading: !this.state.loading });
    setTimeout(() => {
      this.props.register(name, email, password, passwordConfirmation, phoneNumber).then(() => {
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
      <View style={styles.container}>
        <View style={styles.content}>
          <RegisterForm registerClicked={this.onPressRegister} />
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
  content: {
    flex: 1,
    marginTop: 20,
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

