import { combineReducers } from 'redux';
import routerReducer from './nodes/router/reducer';

export default combineReducers({
    router: routerReducer,
});