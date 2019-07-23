import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    fareContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: Dimensions.get("window").width,
      height: 40,
      padding: 10,
      backgroundColor: "grey"
    },
    fareText: {
      fontSize: 16,
      color: '#FFF'
    },
    fareAmount: {
      fontWeight: "bold",
      fontSize: 16,
      color: '#FFF'
    }
  });