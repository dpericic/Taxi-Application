import React from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet
} from 'react-native';

export default class AuthConfirm extends React.Component {
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