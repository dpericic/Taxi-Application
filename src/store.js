import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { createLogger } from 'redux-logger';
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client/dist/socket.io";

const socket = io('http://localhost:8080');
const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const logger = createLogger({diff: true, collapsed: true});
const middleware = [thunk, logger, socketIoMiddleware];

const enhancer = compose(applyMiddleware(...middleware));

export const store = createStore(rootReducer, undefined, enhancer);

export const persistor = persistStore(store);