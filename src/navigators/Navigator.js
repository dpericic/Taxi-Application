import React from "react";
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import { Icon } from "native-base";

import Home from "./routes/Home/Home";
import TrackDriver from "./routes/TrackDriver/TrackDriver";
import AboutPage from "../components/AboutPage/AboutPage";
import DrawerCustomization from "../components/misc/DrawerCustomization";
import Splash from "../components/misc/Splash";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import AuthConfirm from "../components/misc/AuthConfirm";
import LogoutUser from "../components/misc/LogoutUser";
import UserRegistration from "../components/misc/UserRegistration";

const mainStackNavigator = createStackNavigator({
  Home: Home,
  TrackDriver: TrackDriver
});

const drawerNavigator = createDrawerNavigator(
  {
    Main: {
      screen: mainStackNavigator,
      navigationOptions: {
        drawerIcon: () => (
          <Icon name="home" style={{ fontSize: 24, color: "tomato" }} />
        )
      }
    },
    About: {
      screen: AboutPage,
      navigationOptions: {
        drawerIcon: () => (
          <Icon
            name="md-information-circle-outline"
            style={{ fontSize: 24, color: "tomato" }}
          />
        )
      }
    },
    Logout: {
      screen: LogoutUser,
      navigationOptions: {
        drawerIcon: () => (
          <Icon name="md-exit" style={{ fontSize: 24, color: "tomato" }} />
        )
      }
    }
  },
  {
    initialRouteName: "Main",
    contentComponent: DrawerCustomization,
    contentOptions: {
      activeTintColor: "#ff6363"
    }
  }
);

const rootNavigator = createSwitchNavigator(
  {
    Splash: Splash,
    AuthConfirm: AuthConfirm,
    Login: Login,
    SignUp: SignUp,
    App: drawerNavigator,
    UserRegistration: UserRegistration
  },
  {
    initialRouteName: "Splash"
  }
);

export default createAppContainer(rootNavigator);
