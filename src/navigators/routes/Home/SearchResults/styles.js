import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    searchResultsWrapper: {
      top: 220,
      position: "absolute",
      width: Dimensions.get("window").width,
      height: 1000,
      backgroundColor: "#fff",
      opacity: 0.9
    },
    primaryText: {
      fontWeight: "bold",
      color: "#373737"
    },
    secondaryText: {
      fontStyle: "italic",
      color: "#7D7D7D"
    },
    leftContainer: {
      flexWrap: "wrap",
      alignItems: "flex-start",
      borderLeftColor: "#000"
    },
    leftIcon: {
      fontSize: 25,
      color: "#000"
    },
    distance: {
      fontSize: 12
    }
  });