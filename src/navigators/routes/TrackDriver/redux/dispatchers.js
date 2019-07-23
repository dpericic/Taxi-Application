import {
  GET_CURRENT_LOCATION,
  GET_DRIVER_INFORMATION,
  GET_DRIVER_LOCATION,
  GET_DISTANCE_FROM_DRIVER
} from "./types";
import { Dimensions } from "react-native";
import RNGooglePlaces from "react-native-google-places";
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

export const getDriverInfo = () => {
  return (dispatch, getState) => {
    let id = getState().home.booking.driverId;
    request.get("http://localhost:8080/api/driver/" + id).finish((err, res) => {
      dispatch({
        type: GET_DRIVER_INFORMATION,
        payload: res.body
      });
    });
  };
};

export const getDriverLocation = () => {
  return (dispatch, getState) => {
    let id = getState().home.booking.driverId;
    request
      .get("http://localhost:8080/api/driverLocation/" + id)
      .finish((err, res) => {
        dispatch({
          type: GET_DRIVER_LOCATION,
          payload: res.body
        });
      });
  };
};

export const getDistanceFromDriver = () => {
  return (dispatch, getState) => {
    if (getState().trackDriver.driverLocation) {
      request
        .get("https://maps.googleapis.com/maps/api/distancematrix/json")
        .query({
          origins:
            getState().home.selectedAddress.pickUp.latitude +
            "," +
            getState().home.selectedAddress.pickUp.longitude,
          destinations:
            getState().trackDriver.driverLocation.coordinate.coordinates[1] +
            "," +
            getState().trackDriver.driverLocation.coordinate.coordinates[0],
          mode: "driving",
          key: "AIzaSyBmrH5MOpamINj58woz7Q_O_syA149ejr8"
        })
        .finish((error, res) => {
          dispatch({
            type: GET_DISTANCE_FROM_DRIVER,
            payload: res.body
          });
        });
    }
  };
};
