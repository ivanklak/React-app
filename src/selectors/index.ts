import {AppStateType} from '../Redux/redux-store';

export const getInitial = (state: AppStateType) => state.app.initialized;

export const getAuth = (state: AppStateType) => state.auth.isAuth;

export const getLogin = (state: AppStateType) => state.auth.login;
