import React, {Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LoginForm from './LoginForm'; 
export default class Login extends Component{
    render(){
        return(
            <View style = {styles.container}>
            <View style={styles.logoContainer}>
            <Image
            style={styles.logo}
            source ={require('spelletjes/images/logo.png')} />
        <Text style={styles.title}>An app made for gamers</Text>
            </View>
        <View style={styles.container}>
            <LoginForm/>
            </View>
            </View>
        );
    }
   
}
 const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#e67e22'
    },

logoContainer:{
    alignItems:'center',
    flexGrow:1,
    justifyContent:'center'
},
logo:{
    width: 120,
    height:100
},
title: {
 color:'#FFF',                                  
 marginTop: 10,                              
 width: 160,
 textAlign: 'center',                         
 opacity: 0.7      
}
                                  });