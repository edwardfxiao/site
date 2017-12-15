import { combineReducers } from 'redux';
import * as REDUCERS from './reducers';
import objectAssign from 'object-assign';
import { routerReducer } from 'react-router-redux'
export const reducer = combineReducers(objectAssign({}, REDUCERS, {routing: routerReducer}));
