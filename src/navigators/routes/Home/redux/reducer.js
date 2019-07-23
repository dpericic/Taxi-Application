import {
  GET_CURRENT_LOCATION,
  GET_INPUT,
  TOGGLE_SEARCH_RESULT,
  GET_ADDRESS_PREDICTIONS,
  GET_SELECTED_ADDRESS,
  GET_DISTANCE_MATRIX,
  GET_FARE,
  BOOK_CAR,
  GET_NEARBY_DRIVERS,
  BOOKING_CONFIRMED
} from "./types";
import { Dimensions } from "react-native";

const initialState = {
  region: {
    latitude: 40.712776,
    longitude: -74.005974,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  },
  inputData: {
    key: ""
  },
  resultTypes: {},
  predictions: [],
  selectedAddress: {},
  distanceMatrix: {},
  fare: null,
  booking: {},
  nearbyDrivers: []
};

const homeReducer = (state = initialState, action) => {
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
    case GET_INPUT:
      const { key, value } = action.payload;
      return {
        ...state,
        inputData: {
          [key]: value
        }
      };
    case TOGGLE_SEARCH_RESULT:
      if (action.payload === "pickUp") {
        return {
          ...state,
          resultTypes: {
            pickUp: true,
            dropOff: false
          },
          predictions: []
        };
      } else if (action.payload === "dropOff") {
        return {
          ...state,
          resultTypes: {
            pickUp: false,
            dropOff: true
          },
          predictions: []
        };
      }

      return {
        ...state,
        resulttypes: {
          pickUp: false,
          dropOff: false
        },
        predictions: []
      }
    case GET_ADDRESS_PREDICTIONS:
      return {
        ...state,
        predictions: action.payload
      };
    case GET_SELECTED_ADDRESS:
      const selectedTitle = state.resultTypes.pickUp ? "pickUp" : "dropOff";

      return {
        ...state,
        selectedAddress: {
          [selectedTitle]: action.payload
        },
        resultTypes: {
          pickUp: false,
          dropOff: false
        }
      };
    case GET_DISTANCE_MATRIX:
      return {
        ...state,
        distanceMatrix: action.payload
      };
    case GET_FARE:
      return {
        ...state,
        fare: action.payload
      };
    case BOOK_CAR:
      return {
        ...state,
        booking: action.payload
      };
    case GET_NEARBY_DRIVERS:
      return {
        ...state,
        nearbyDrivers: action.payload
      };
    case BOOKING_CONFIRMED:
      return {
        ...state,
        booking: action.payload
      };
    case 'DISTILL':
      return {
        ...state,
        resultTypes: {
          pickUp: false,
          droPOff: false
        }
      }
    default:
      return state;
  }
};

export default homeReducer;
