import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View ,StatusBar} from 'react-native';

import Login from './src/components/Login/Login';
import {Provider} from "react-redux";
import configureStore from './src/store/configureStore';

const store = configureStore();

class Spelletjes extends Component{
    static navigationOptions = {
        title: 'Home',
    }
    render(){

        return(
         <Provider store={store}>
             <View style={styles.container}>
                 <StatusBar
                     backgroundColor = "#1c313a"
                     barStyle="light-content"/>
                 <Login/>
             </View>
         </Provider>
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