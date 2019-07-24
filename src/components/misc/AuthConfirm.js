import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  View,
  StyleSheet
} from 'react-native';

export default class AuthConfirm extends React.Component {
  constructor(props) {
    super(props);
    this._initAuth();
  }

  _initAuth = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    this.props.navigation.navigate(userToken ? 'App' : 'Authentication');
  };

  render() {
    return (
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF5E3A'
  }
});