import React from "react";
import { StatusBar } from "react-native";
import { Container, View, Icon } from "native-base";
import { connect } from "react-redux";
import {
  getCurrentLocation,
  getInputData,
  toggleSearchResults,
  getAddressPredictions,
  getSelectedAddress,
  bookCar,
  getNearbyDrivers
} from "./redux/dispatchers";
import MapContainer from "./MapContainer/MapContainer";
import Header from "../../../components/Header/Header";
import Fare from "../../../components/Fare/Fare";
import ActionButton from "./ActionButton/ActionButton";
import FindDriver from "./FindDriver/FindDriver";
import { styles } from './styles';

const logo = require("../../../assets/logo/logo.png");
const driverImage = require("../../../assets/image/car.png");

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <Header logo={logo} navigation={navigation} />
    };
  };

  constructor(props) {
    super(props);
    setTimeout(() => {
      StatusBar.setHidden(false);
      StatusBar.setBackgroundColor('tomato');
     }, 100);
  }

  componentDidMount() {
    this.props.getCurrentLocation();
    setTimeout(() => {
      this.props.getNearbyDrivers();
    }, 1000);
  }

  componentDidUpdate() {
    if (this.props.booking.status === "confirmed") {
      this.props.navigation.navigate("TrackDriver");
    }
  }

  componentWillUnmount() {
    this.props.distill();
  }

  render() {
    const { status } = this.props.booking;

    return (
      <Container>
        {(status !== "pending" && (
          <View style={styles.container}>
            {this.props.region.latitude && (
              <MapContainer
                region={this.props.region}
                getInputData={this.props.getInputData}
                toggleSearchResults={this.props.toggleSearchResults}
                getAddressPredictions={this.props.getAddressPredictions}
                resultTypes={this.props.resultTypes}
                predictions={this.props.predictions}
                getSelectedAddress={this.props.getSelectedAddress}
                selectedAddress={this.props.selectedAddress}
                nearbyDrivers={this.props.nearbyDrivers}
                driverImage={driverImage}
              />
            )}
            <ActionButton handleBooking={() => this.props.bookCar()} disabled={(this.props.selectedAddress.pickUp || this.props.selectedAddress.dropOff) ? false : true} />
            {this.props.fare && <Fare fare={this.props.fare} />}
          </View>
        )) || <FindDriver selectedAddress={this.props.selectedAddress} />}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    region: state.home.region,
    inputData: state.home.inputData || {},
    resultTypes: state.home.resultTypes || {},
    predictions: state.home.predictions || [],
    selectedAddress: state.home.selectedAddress || {},
    fare: state.home.fare,
    booking: state.home.booking || {},
    nearbyDrivers: state.home.nearbyDrivers || []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentLocation: () => dispatch(getCurrentLocation()),
    getInputData: input => dispatch(getInputData(input)),
    toggleSearchResults: value => dispatch(toggleSearchResults(value)),
    getAddressPredictions: () => dispatch(getAddressPredictions()),
    getSelectedAddress: address => dispatch(getSelectedAddress(address)),
    bookCar: () => dispatch(bookCar()),
    getNearbyDrivers: () => dispatch(getNearbyDrivers()),
    distill: () => dispatch({type: 'DISTILL'})
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
