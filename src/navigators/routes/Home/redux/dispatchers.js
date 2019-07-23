import {
  GET_CURRENT_LOCATION,
  GET_INPUT,
  TOGGLE_SEARCH_RESULT,
  GET_ADDRESS_PREDICTIONS,
  GET_SELECTED_ADDRESS,
  GET_DISTANCE_MATRIX,
  GET_FARE,
  BOOK_CAR,
  GET_NEARBY_DRIVERS
} from "./types";
import RNGooglePlaces from "react-native-google-places";
import request from "../../../../components/utils/request";
import calculateFare from "../../../../components/utils/fareCalculator";

export const getCurrentLocation = () => {
  return dispatch => {
    navigator.geolocation.getCurrentPosition(
      position => {
        dispatch({
          type: GET_CURRENT_LOCATION,
          payload: position
        });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
};

export const getInputData = input => {
  return {
    type: GET_INPUT,
    payload: input
  };
};

export const toggleSearchResults = value => {
  console.log('Dispatcher tSR method');
  
  if (value === 'pickUp' || value === 'dropOff') {
    return {
      type: TOGGLE_SEARCH_RESULT,
      payload: value
    };
  }

  return {
    type: TOGGLE_SEARCH_RESULT,
    payload: null
  }
};

export const getAddressPredictions = () => {
  return (dispatch, getState) => {
    let userInput = getState().home.resultTypes.pickUp
      ? getState().home.inputData.pickUp
      : getState().home.inputData.dropOff;
    RNGooglePlaces.getAutocompletePredictions(userInput, { country: "US" })
      .then(result =>
        dispatch({
          type: GET_ADDRESS_PREDICTIONS,
          payload: result
        })
      )
      .catch(err => console.log(err));
  };
};

export const getSelectedAddress = address => {
  const fareNumbers = {
    baseFare: 0.4,
    timeRate: 0.14,
    distanceRate: 0.97,
    surge: 1
  };

  return (dispatch, getState) => {
    RNGooglePlaces.lookUpPlaceByID(address)
      .then(result => {
        dispatch({ type: GET_SELECTED_ADDRESS, payload: result });
      })
      .then(() => {
        //  Get distance and time
        if (
          getState().home.selectedAddress.pickUp &&
          getState().home.selectedAddress.dropOff
        ) {
          request
            .get("https://maps.googleapis.com/maps/api/distancematrix/json")
            .query({
              origins: `${getState().home.selectedAddress.pickUp.latitude},${
                getState().home.selectedAddress.pickUp.longitude
              }`,
              destinations: `${getState().home.selectedAddress.dropOff.latitude},${
                getState().home.selectedAddress.dropOff.longitude
              }`,
              mode: "driving",
              key: "AIzaSyBmrH5MOpamINj58woz7Q_O_syA149ejr8"
            })
            .finish((err, res) => {
              console.log(err);

              dispatch({
                type: GET_DISTANCE_MATRIX,
                payload: res.body
              });
            })
        }
        setTimeout(() => {
          if (
            getState().home.selectedAddress.pickUp &&
            getState().home.selectedAddress.dropOff
          ) {
            const fare = calculateFare(
              fareNumbers.baseFare,
              fareNumbers.timeRate,
              getState().home.distanceMatrix.rows[0].elements[0].duration.value,
              fareNumbers.distanceRate,
              getState().home.distanceMatrix.rows[0].elements[0].distance.value,
              fareNumbers.surge
            );

            dispatch({
              type: GET_FARE,
              payload: fare
            });
          }
        }, 2000);
      })
      .catch(err => alert(err.message));
  };
};

export const bookCar = () => {
  return (dispatch, getState) => {
    const nearbyDrivers = getState().home.nearbyDrivers;
    const nearbyDriver = nearbyDrivers[Math.floor(Math.random() * nearbyDrivers.length)];

    const booking = {
      data: {
        userName: "user1",
        pickUp: {
          address: getState().home.selectedAddress.pickUp.address,
          name: getState().home.selectedAddress.pickUp.name,
          latitude: getState().home.selectedAddress.pickUp.latitude,
          longitute: getState().home.selectedAddress.pickUp.longitude
        },
        dropOff: {
          address: getState().home.selectedAddress.dropOff.address,
          name: getState().home.selectedAddress.dropOff.name,
          latitude: getState().home.selectedAddress.dropOff.latitude,
          longitute: getState().home.selectedAddress.dropOff.longitude
        },
        fare: getState().home.fare,
        status: "pending"
      },
      nearbyDriver: {
        socketId: nearbyDriver.socketId,
        driverId: nearbyDriver.driverId,
        latitude: nearbyDriver.coordinate.coordinates[1],
        longitude: nearbyDriver.coordinate.coordinates[0]
      }
    };

    request
      .post("http://localhost:8080/api/bookings")
      .send(booking)
      .finish((err, res) => {
        dispatch({
          type: BOOK_CAR,
          payload: res.body
        });
      });
  };
};

export const getNearbyDrivers = () => {
  return (dispatch, getState) => {
    request
      .get("http://localhost:8080/api/driverLocation")
      .query({
        latitude: getState().home.region.latitude,
        longitude: getState().home.region.longitude
      })
      .finish((err, res) => {
        if (res) {
          dispatch({
            type: GET_NEARBY_DRIVERS,
            payload: res.body
          });
        }
      });
  };
};