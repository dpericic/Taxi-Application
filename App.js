import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./src/store";
import Navigator from "./src/navigators/Navigator";
import { PersistGate } from "redux-persist/integration/react";
import LoadingView from './src/components/misc/LoadingView';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<LoadingView />} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  }
}
