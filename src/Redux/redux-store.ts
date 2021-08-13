import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

import profileReducer from './profile-reducer';
import dialogsReducer from './Dialogs/dialogs-reducer';
import usersReducer from './users-reducer';
import authReducer from './Authentication/auth-reducer';
import appReducer from './App/app-reducer';

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

type ReducerType = typeof reducers;
export type AppStateType = ReturnType<ReducerType>;

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.store = store;

export default store;
