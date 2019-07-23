import React from "react";
import { Text, Input, InputGroup, View } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from './styles';

const SearchBox = ({getInputData, toggleSearchResults, getAddressPredictions, selectedAddress}) => {
  const { pickUp, dropOff } = selectedAddress || {};

  function _handleInput(key, value) {
    getInputData({key, value});
    getAddressPredictions();
  }

  return (
    <View style={styles.searchBox}>
      <View style={styles.pickupWrapper}>
        <Text style={styles.label}>PICK UP</Text>
        <InputGroup>
          <Icon name="search" size={15} color="#FF5E3A" />
            <Input
              style={styles.inputSearch}
              placeholder="Choose your pickup location"
              onChangeText={_handleInput.bind(this, 'pickUp')}
              onFocus={() => toggleSearchResults("pickUp")}
              value={pickUp && pickUp.name}
            />
        </InputGroup>
      </View>
      <View style={styles.dropOffWrapper}>
        <Text style={styles.label}>DROP OFF</Text>
        <InputGroup>
          <Icon name="search" size={15} color="#FF5E3A" />
            <Input
              style={styles.inputSearch}
              placeholder="Choose drop off location"
              onChangeText={_handleInput.bind(this, 'dropOff')}
              onFocus={() => toggleSearchResults("dropOff")}
              on
              value={dropOff && dropOff.name}
              />
        </InputGroup>
      </View>
    </View>
  );
};

export default SearchBox;
