import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  View,
} from 'react-native';

export default class LogoutUser extends React.Component {
    constructor(props) {
      super(props);
      this._logoutUser();
    }
  
    _logoutUser = async () => {
      await AsyncStorage.removeItem('userToken');
  
      this.props.navigation.navigate('Login');
    };
  
    render() {
      return (
        <View style={{backgroundColor: '#FF5E3A', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      );
    }
  }