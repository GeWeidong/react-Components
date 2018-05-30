import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as home from '@/store/home/reducer';
import * as detail from '@/store/detail/reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// 生产环境禁掉logger
let middleWare = process.env.NODE_ENV !== 'production' ? [thunk, logger] : [thunk];

let store = createStore(
  combineReducers({...home, ...detail}),
  applyMiddleware(...middleWare)
);

export default store;
