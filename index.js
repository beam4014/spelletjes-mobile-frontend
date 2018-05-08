import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View ,StatusBar} from 'react-native';
import Login from './src/components/Login/Login';

export default class Spelletjes extends Component{
    render(){
        return(
         <View style={styles.container}>
            <StatusBar
             backgroundColor = "#1c313a"
            barStyle="light-content"/>
            <Login/>
            </View>
        );
    }
    

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e67e22',
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    }
});
AppRegistry.registerComponent('spelletjes',() => Spelletjes);