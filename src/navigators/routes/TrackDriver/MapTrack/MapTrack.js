import React from "react";
import { View } from "native-base";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { styles } from './styles';

const MapTrack = ({
  region,
  driverLocation,
  showCarMaker,
  selectedAddress,
  carMarker
}) => {
  const { pickUp, dropOff } = selectedAddress || {};

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
      >
        {pickUp && (
          <MapView.Marker
            coordinate={{
              latitude: pickUp.latitude,
              longitude: pickUp.longitude
            }}
            pinColor="green"
          />
        )}
        {dropOff && (
          <MapView.Marker
            coordinate={{
              latitude: dropOff.latitude,
              longitude: dropOff.longitude
            }}
            pinColor="blue"
          />
        )}
        {showCarMaker && (
          <MapView.Marker
            coordinate={{
              latitude: driverLocation.coordinate.coordinates[1],
              longitude: driverLocation.coordinate.coordinates[0]
            }}
            image={carMarker}
          />
        )}
      </MapView>
    </View>
  );
};

export default MapTrack;
