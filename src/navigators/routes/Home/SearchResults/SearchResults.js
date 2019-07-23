import React from "react";
import { View, ListItem, Text, Left, Body, List } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from './styles';

const SearchResults = ({ predictions, getSelectedAddress }) => {
  function handleSelectedAddress(placeID) {
    getSelectedAddress(placeID);
  }

  return (
    <View style={styles.searchResultsWrapper}>
      <List
        dataArray={predictions}
        renderRow={item => (
          <View key={item.placeID}>
            <ListItem onPress={() => handleSelectedAddress(item.placeID)} button avatar>
              <Left style={styles.leftContainer}>
                <Icon name="location-on" styles={styles.leftIcon} />
              </Left>
              <Body>
                <Text style={styles.primaryText}>{item.primaryText}</Text>
                <Text style={styles.secondaryText}>{item.secondaryText}</Text>
              </Body>
            </ListItem>
          </View>
        )}
      />
    </View>
  );
};

export default SearchResults;
