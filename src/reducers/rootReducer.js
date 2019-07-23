import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import home from '../navigators/routes/Home/redux/reducer';
import trackDriver from '../navigators/routes/TrackDriver/redux/reducer';

const config = {
    key: 'root',
    storage: storage
}

export default persistCombineReducers(config, {
    home,
    trackDriver
});