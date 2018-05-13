import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
export default class FlatList extends Component{
    componentWillMount(){
        axios.get('http://10.0.2.2:8000/api/listings', { headers: { Authorization: AuthStr } }).then(response => {
            // If request is good
            console.warn(response.data);
          })
          .catch((error) => {
            console.log('error 3 ' + error);
          });
    }
    render(){
        return(
            <View>
            </View>
        )
    }
}

const AuthStr = 'Bearer '.concat(USER_TOKEN);
    
AppRegistry.registerComponent('FlatList',() => FlatList);