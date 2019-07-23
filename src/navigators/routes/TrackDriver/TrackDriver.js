import React from "react";
import { connect } from "react-redux";
import { Container } from "native-base";
import {
  getCurrentLocation,
  getDriverInfo,
  getDriverLocation,
  getDistanceFromDriver
} from "./redux/dispatchers";
import Header from "../../../components/Header/Header";
import MapTrack from "./MapTrack/MapTrack";
import DriverFound from "./DriverFound/DriverFound";
import DriverFooterProfile from "./DriverFooterProfile/DriverFooterProfile";
import DriverOTWFooter from "./DriverOTWFooter/DriverOTWFooter";

const driverImage = require("../../../assets/image/car.png");

class TrackDriver extends React.Component {
  componentDidMount() {
    this.props.getCurrentLocation();
    this.props.getDriverInfo();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.driverLocation &&
      nextProps.driverLocation !== this.props.driverLocation
    ) {
      this.props.getDistanceFromDriver();
    }
  }

  render() {
    const region = {
        latitude: 40.712776,
        longitude: -74.005974,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
    };
    
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <Header />
          {this.props.region && (
            <MapTrack
              region={this.props.region}
              selectedAddress={this.props.selectedAddress}
              driverLocation={this.props.driverLocation}
              showCarMaker={this.props.showCarMaker}
              carMarker={carMarker}
            />
          )}
          {this.props.distanceFromDriver.rows && (
            <DriverOTWFooter
              driverInfo={this.props.driverInfo}
              distanceFromDriver={this.props.distanceFromDriver}
            />
          )}
          <DriverFooterProfile driverInfo={this.props.driverInfo}/>
          {this.props.showDriverFound && (
            <DriverFound
              driverInfo={this.props.driverInfo}
              getDriverLocation={this.props.getDriverLocation}
            />
          )}
        </View>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentLocation: () => dispatch(getCurrentLocation()),
    getDriverInfo: () => dispatch(getDriverInfo()),
    getDriverLocation: () => dispatch(getDriverLocation()),
    getDistanceFromDriver: () => dispatch(getDistanceFromDriver())
  };
};

const mapStateToProps = state => {
  return {
    region: state.trackDriver.region,
    selectedAddress: state.home.selectedAddress || {},
    driverInfo: state.trackDriver.driverInfo || {},
    driverLocation: state.trackDriver.driverLocation,
    showDriverFound: state.trackDriver.showDriverFound,
    showCarMaker: state.trackDriver.showCarMaker,
    distanceFromDriver: state.trackDriver.distanceFromDriver || {}
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackDriver);
