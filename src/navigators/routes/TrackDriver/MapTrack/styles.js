import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    map: {
      ...StyleSheet.absoluteFillObject
    },
    inputWrapper: {
      top: 0,
      position: "absolute",
      backgroundColor: "#fff",
      width: Dimensions.get("window").width
    },
    inputSearch: {
      backgroundColor: "#fff"
    }
  });