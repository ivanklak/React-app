import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import profileReducer from '../Profile/reducers';
import dialogsReducer from '../Dialogs/reducers';
import usersReducer from '../Users/reducers';
import authReducer from '../Authentication/reducers';

import appReducer from './reducers';

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
});

type ReducerType = typeof reducers;
export type AppStateType = ReturnType<ReducerType>;

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.store = store;

export default store;
