import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    searchBox: {
      top: 6,
      position: "absolute",
      width: Dimensions.get("window").width
    },
    pickupWrapper: {
      marginLeft: 15,
      marginRight: 10,
      marginTop: 10,
      marginBottom: 0,
      backgroundColor: "#fff",
      opacity: 0.9,
      borderRadius: 7
    },
    dropOffWrapper: {
      marginLeft: 15,
      marginRight: 10,
      marginTop: 0,
      backgroundColor: "#fff",
      opacity: 0.9,
      borderRadius: 7
    },
    inputSearch: {
      fontSize: 14
    },
    label: {
      fontSize: 16,
      fontStyle: "italic",
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 0
    }
  });