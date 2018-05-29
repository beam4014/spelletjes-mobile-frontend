import React from 'react';
import {View, Alert, Text, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import {bindActionCreators} from "redux/index";
import {connect} from "react-redux";
import * as authenticationACtions from "../../actions/authentication/authenticationActions";


class SmsVerificationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    }
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onPressVerify = this.onPressVerify.bind(this);
    this.onPressDone = this.onPressDone.bind(this);
  }

  componentDidMount() {
    // this.props.sendSmsVerificationCode().then(() => {
    //   if(!this.props.verificationCodeSent) {
    //     Alert.alert(
    //       'Sorry!',
    //       'Something went wrong with sending you an SMS verification. Please contact ' +
    //       'our support team.'
    //     )
    //   }
    // });
  }
  onChangeCode(code) {
    this.setState({
      code
    });
  }
  onPressVerify() {
    this.props.submitSmsVerificationCode(this.state.code).then(() => {
      if(this.props.verified) {
        Alert.alert(
          'Thank you',
          'Your account is now verified!',
          [
            {text: 'OK', onPress: () => this.onPressDone(true)},
          ],
        )
      } else {
        Alert.alert(
          'Failed',
          'The verification code you have submitted is wrong. Try again.'
        );
      }
    })
  }
  onPressDone(verified = false) {
    if(verified) {
      AsyncStorage.setItem("@spelletjes/verified", JSON.stringify(true));
    }
    this.props.navigator.dismissModal();
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={this.onPressDone}
        >
          <Text>Close</Text>
        </TouchableOpacity>
        <Text>Verify your account</Text>
        <TextInput
          placeholder={'Enter the code that has been sent to your number'}
          value={this.state.code}
          onChangeText={this.onChangeCode}
        />
        <TouchableOpacity
          onPress={this.onPressVerify}
        >
          <Text>Verify me!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    smsSent: state.authentication.verificationCodeSent,
    verified: state.authentication.verified,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendSmsVerificationCode: bindActionCreators(authenticationACtions.requestSmsVerificationCode, dispatch),
    submitSmsVerficationCode: bindActionCreators(authenticationACtions.submitSmsVrificationCode, disptach),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SmsVerificationScreen);
