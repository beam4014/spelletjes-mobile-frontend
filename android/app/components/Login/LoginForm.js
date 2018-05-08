import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
export default class LoginForm extends Component{
   render(){
   return(
   <View style={styles.container}>
       <TextInput
       placeholder="username or email"
       placeholderTextColor ="rgba(255,255,255,0.7)"
       style = {styles.input}/>
       <TextInput
       placeholderTextColor ="rgba(255,255,255,0.7)"
       placeholder="password"
       style = {styles.input}/>
       <Button
       title="LOGIN"
       color="#841584"/>
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
    onPressLearnMore:{
        
    }
});