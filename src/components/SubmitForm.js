import React, {Component} from 'react';
import {AppRegistry,Alert, StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import FlatList from './src/components/FlatList';
export default class LoginForm extends Component{
    
   handlePressButton=()=>{
       axios.post('http://10.0.2.2:8000/api/listings/create', {
            headers: { Authorization: '2eVoCJN46QDFaSYbUBI0RzD9ncs7YFr9Trus3GaF',
                title: 'Mario Bros.',
                game_id: '2',
                type: 'sell',
                price: '65',
                description: 'description of this game',
            })
            .then(response => {
            response.data.access_token
            console.warn(response);
             navigate('FlatList');
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
            });
   }
    render(){
   return(
   <View style={styles.container}>
       <TextInput
       placeholder="title"
       placeholderTextColor ="rgba(255,255,255,0.7)"
       returnKeyType="next"
       onSubmitEditing={() => this.titleInput.focus()}
       onChangeText={
           (text) => {
           this.setState((previousState) =>{return {userText: text};});
       }
       }
       style = {styles.input}/>
       <TextInput
       placeholderTextColor ="rgba(255,255,255,0.7)"
       placeholder="price"
       returnKeyType="go"
       secureTextEntry
       style = {styles.input}
       ref={(input)=> this.priceInput = input}
              onChangeText={
           (text) => {
           this.setState((previousState) =>{return {priceText: text};});
       }
       }/>
              <TextInput
       placeholderTextColor ="rgba(255,255,255,0.7)"
       placeholder="description"
       returnKeyType="go"
       style = {styles.input}
       ref={(input)=> this.descriptionInput = input}
              onChangeText={
           (text) => {
           this.setState((previousState) =>{return {descriptionText: text};});
       }
       }/>
       
       <TouchableOpacity style = {styles.buttonContainer}
           onPress={this.handlePressButton}
        underlayColor="blue">
       <Text style = {styles.buttonText}>SUBMIT</Text>
       
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

const AuthStr = 'Bearer '.concat(USER_TOKEN);

AppRegistry.registerComponent('LoginForm',() => LoginForm);