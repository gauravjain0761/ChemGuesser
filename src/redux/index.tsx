import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { USER_LOGOUT } from './actionTypes';
import commonReducer from './reducer/commonReducer';

// const middleware = [thunk];

const reducers = combineReducers({
  common: commonReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === USER_LOGOUT) {
    return reducers(undefined, action);
  }
  return reducers(state, action);
};

const store = configureStore({ reducer: rootReducer });

export default store;
