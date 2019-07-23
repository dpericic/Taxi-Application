import React from "react";
import { Text } from "react-native";
import { View, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import Spinner from "react-native-spinkit";
import { styles } from './styles';

const FindDriver = ({ selectedAddress }) => {
  const { pickUp, dropOff } = selectedAddress || {};

  return (
    <View style={styles.findDriverContainer}>
      <Spinner
        style={styles.spinner}
        isVisible
        size={150}
        type="Pulse"
        color="#FFF"
      />
      <View style={styles.content}>
        <Text style={styles.text}>Processing your request</Text>
        <Icon style={styles.locationIcon} name="map-marker" />

        <View style={styles.pickup}>
          <Text>{pickUp.name}</Text>
        </View>
        <Icon style={styles.toArrow} name="long-arrow-down" />
        <View style={styles.dropoff}>
          <Text>{dropOff.name}</Text>
        </View>

        <View>
          <Text style={styles.termsText}>
            By booking you confirm that you accept our T & C
          </Text>
          <Button style={styles.cancelBtn}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default FindDriver;
