import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
export default class LoginForm extends Component{
    
   handlePressButton=()=>{
       axios.post('http://localhost:8000/oauth/token', {
                grant_type: 'password',
                client_id: '2',
                client_secret: '2eVoCJN46QDFaSYbUBI0RzD9ncs7YFr9Trus3GaF',
                username: 'b@b.com',
                password: 'secret',
                scope: ''
            })
            .then(response => {
            console.log(response);
            })
            .catch(error => {
           console.log(error);
            });
   }
    render(){
   return(
   <View style={styles.container}>
       <TextInput
       placeholder="username or email"
       placeholderTextColor ="rgba(255,255,255,0.7)"
       returnKeyType="next"
       onSubmitEditing={() => this.passwordInput.focus()}
       keyboardType="email-address"
       autoCapitalize="none"
       autoCorrect={false}
       onChangeText={
           (text) => {
           this.setState((previousState) =>{return {userText: text};});
       }
       }
       style = {styles.input}/>
       <TextInput
       placeholderTextColor ="rgba(255,255,255,0.7)"
       placeholder="password"
       returnKeyType="go"
       secureTextEntry
       style = {styles.input}
       ref={(input)=> this.passwordInput = input}
              onChangeText={
           (text) => {
           this.setState((previousState) =>{return {passwordText: text};});
       }
       }/>
       <TouchableOpacity style = {styles.buttonContainer}
           onPress={this.handlePressButton}
        underlayColor="blue">
       <Text style = {styles.buttonText}>LOGIN</Text>
       
</TouchableOpacity>
   </View>
   );
  }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#e67e22'
    },
    input:{
        height:40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom:10,
        color:'#FFF',
        paddingHorizontal:10,
    },
    buttonContainer:{
     backgroundColor:'#34495e',
     paddingVertical: 15,
        
},
    buttonText:{
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700',
    },

});