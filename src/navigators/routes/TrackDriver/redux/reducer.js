import {
  GET_CURRENT_LOCATION,
  GET_DRIVER_INFORMATION,
  GET_DRIVER_LOCATION,
  GET_DISTANCE_FROM_DRIVER
} from "./types";
import { Dimensions } from "react-native";

const initialState = {
    region: {},
    showDriverFound: true
};

const trackDriverReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_LOCATION:
      const ASPECT_RATIO =
        Dimensions.get("window").width / Dimensions.get("window").height;

      const LATITUDE_DELTA = 0.015;
      const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

      return {
        ...state,
        region: {
          latitude: action.payload.coords.latitude,
          longitude: action.payload.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      };
    case GET_DRIVER_INFORMATION:
        return {
            ...state,
            driverInfo: action.payload
        };
    case GET_DRIVER_LOCATION:
        return {
            ...state,
            driverLocation: action.payload,
            showDriverFound: false,
            showCarMaker: true
        };
    case GET_DISTANCE_FROM_DRIVER:
        return {
            ...state,
            distanceFromDriver: action.payload
        };
    default:
      return state;
  }
};

export default trackDriverReducer;
