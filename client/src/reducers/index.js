import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import {authReducer} from './auth.reducer';

export default (history) => combineReducers({
    authReducer,
    router: connectRouter(history)
});