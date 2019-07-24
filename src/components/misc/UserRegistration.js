import React from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from "react-native";

export default class AuthLoadingScreen extends React.Component {
  
  componentDidMount() {
    setTimeout(() => this.props.navigation.navigate('Authentication'), 1500);
  }

  render() {
    const email = this.props.navigation.getParam('email');

    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#fff"
          style={styles.indicatorStyling}
        />
        <Text style={styles.textStyling}>
          Registration successful. You can now login using:
        </Text>
        <Text style={styles.emailStyling}>{email}</Text>
        <Text style={styles.textStyling}>Redirecting to login page...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF5E3A"
  },
  textStyling: {
    color: "#fff",
    fontSize: 18
  },
  indicatorStyling: {
    marginBottom: 20
  },
  emailStyling: {
      fontSize: 20,
      fontStyle: 'italic',
      fontWeight: 'bold',
      color: '#fff',
      marginTop: 5,
      marginBottom: 10
  }
});
