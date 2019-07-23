import React from "react";
import { View, Image, ScrollView, StyleSheet } from "react-native";
import { DrawerItems } from "react-navigation";

const DrawerCustomization = props => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/image/profile.jpg")}
          style={styles.profileFormat}
        />
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container :{
    flex: 1
  },
  content: {
    height: 150,
    backgroundColor: "#FF5E3A",
    alignItems: "center",
    justifyContent: "center"
  },
  profileFormat: {
    height: 120,
    width: 120,
    borderRadius: 60
  }
});

export default DrawerCustomization;
