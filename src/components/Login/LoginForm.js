import React, {Component} from 'react';
import {AppRegistry, Alert, StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';

import * as authenticationAction from '../../actions/authentication/authenticationActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userText: '',
            passwordText: '',
        };

        this.handlePressButton = this.handlePressButton.bind(this);
    }
    handlePressButton() {
        console.log('logging in..');
        this.props.login(this.state.userText, this.state.passwordText)
            .then(() => {
                console.log(this.props.token);
                if(this.props.token) {
                    alert('logged in')
                } else {
                    alert('unsuccessful')
                }
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="username or email"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={
                        (text) => {
                            this.setState((previousState) => {
                                return {userText: text};
                            });
                        }
                    }
                    style={styles.input}/>
                <TextInput
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    placeholder="password"
                    returnKeyType="go"
                    secureTextEntry
                    style={styles.input}
                    ref={(input) => this.passwordInput = input}
                    onChangeText={
                        (text) => {
                            this.setState((previousState) => {
                                return {passwordText: text};
                            });
                        }
                    }/>
                <TouchableOpacity style={styles.buttonContainer}
                                  onPress={this.handlePressButton}
                                  underlayColor="blue">
                    <Text style={styles.buttonText}>LOGIN</Text>

                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e67e22'
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
        paddingVertical: 15,

    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700',
    },

});

function mapStateToProps(state, ownProps) {
    return {
        token: state.authentication.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(authenticationAction.authenticate, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)