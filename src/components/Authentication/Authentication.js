import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Swiper from "react-native-swiper";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

console.disableYellowBox = true;

export default class Authentication extends Component {
  render() {
    return (
      <Swiper loop={false} paginationStyle={{position:'absolute', bottom: -100}}>
        <View style={styles.slide1}>
          <Login navigation={this.props.navigation}/>
        </View>
        <View style={styles.slide2}>
          <SignUp navigation={this.props.navigation}/>
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  slide1: {
    flex: 1
  },
  slide2: {
    flex: 1
  }
});
