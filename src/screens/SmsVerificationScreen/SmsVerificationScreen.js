import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authenticationActions from '../../actions/authentication/authenticationActions';

class SmsVerificationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestedCode: false,
      code: '',
    };
    this.sendSmsCode = this.sendSmsCode.bind(this);
    this.onChangeTextCode = this.onChangeTextCode.bind(this);
    this.onPressVerify = this.onPressVerify.bind(this);
  }
  onChangeTextCode(code) {
    this.setState({
      code,
    });
  }
  onPressVerify() {
    this.props.verifyUser(this.state.code).then(() => {
      if (this.props.verified) {
        this.props.navigator.dismissModal();
        setTimeout(() => {
          Alert.alert('Verification Successful!');
        });
      }
    });
  }
  sendSmsCode() {
    this.props.sendCode().then(() => {
      if (this.props.codeSent) {
        this.setState({
          requestedCode: true,
        });
      } else {
        Alert.alert('Please try again', 'Something went wrong. Try again..');
      }
    });
  }
  render() {
    if (!this.state.requestedCode) {
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Verify Phone Number</Text>
            <Text style={styles.subtitle}>
              You will need to verify your code in order to use Spelletjes.
            </Text>
            <TouchableOpacity
              style={styles.sendMeCodeButton}
              onPress={this.sendSmsCode}
            >
              <Text style={styles.sendMeCodeButtonText}>I want to be verified.</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Verify Phone Number</Text>
          <Text style={styles.subtitle}>
            You will need to verify your code in order to use Spelletjes.
          </Text>
          <TextInput
            value={this.state.code}
            placeholder="Verification Code"
            onChangeText={text => this.onChangeTextCode(text)}
          />
          <TouchableOpacity
            style={styles.verifyMeButton}
            onPress={this.onPressVerify}
          >
            <Text style={styles.verifyMeButtonText}>Verify Me</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

SmsVerificationScreen.propTypes = {
  codeSent: PropTypes.bool.isRequired,
  verified: PropTypes.bool.isRequired,
  sendCode: PropTypes.func.isRequired,
  verifyUser: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  content: {
    flex: 1,
    margin: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    color: 'orange',
  },
  subtitle: {
    textAlign: 'center',
    color: 'orange',
    fontSize: 15,
  },
  sendMeCodeButton: {
    backgroundColor: '#ccc',
  },
  sendMeCodeButtonText: {
    color: '#000',
    padding: 10,
  },
  verifyMeButton: {
    backgroundColor: 'orange',
  },
  verifyMeButtonText: {
    color: '#fff',
  },
});

function mapStateToProps(state, ownProps) {
  return {
    codeSent: state.authentication.codeSent,
    verified: state.authentication.verified,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendCode: bindActionCreators(authenticationActions.sendSmsVerificationCode, dispatch),
    verifyUser: bindActionCreators(authenticationActions.verifyUser, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SmsVerificationScreen);
