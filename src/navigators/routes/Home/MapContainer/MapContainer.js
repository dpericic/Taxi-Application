import React from "react";
import { Container } from "native-base";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import SearchBox from "../SearchBox/SearchBox";
import SearchResults from "../SearchResults/SearchResults";
import { styles } from './styles';

const MapContainer = ({
  region,
  getInputData,
  toggleSearchResults,
  getAddressPredictions,
  resultTypes,
  predictions,
  getSelectedAddress,
  selectedAddress,
  nearbyDrivers,
  driverImage
}) => {
  const { pickUp, dropOff } = selectedAddress || {};

  return (
    <Container styles={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region}>
        {pickUp && (
          <MapView.Marker
            coordinate={{
              latitude: pickUp.latitude,
              longitude: pickUp.longitude
            }}
            pinColor="red"
            title="Pickup destination"
          />
        )}
        {dropOff && (
          <MapView.Marker
            coordinate={{
              latitude: dropOff.latitude,
              longitude: dropOff.longitude
            }}
            pinColor="green"
            title="Drop-off destination"
          />
        )}

        {nearbyDrivers &&
          nearbyDrivers.map((el, index) => {
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: marker.coordinate.coordinates[1],
                longitude: marker.coordinate.coordinates[0]
              }}
              image={driverImage}
              title="Driver"
            />;
          })}
      </MapView>
      <SearchBox
        getInputData={getInputData}
        toggleSearchResults={toggleSearchResults}
        getAddressPredictions={getAddressPredictions}
        selectedAddress={selectedAddress}
      />
      {(resultTypes.pickUp || resultTypes.dropOff) ? (
        <SearchResults
          predictions={predictions}
          getSelectedAddress={getSelectedAddress}
        />
      ) : null}
    </Container>
  );
};

export default MapContainer;
