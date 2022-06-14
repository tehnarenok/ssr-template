import { combineReducers } from '@reduxjs/toolkit';
import routerReducer from './router';

export default combineReducers({
    router: routerReducer,
});
