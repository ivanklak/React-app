import {stopSubmit} from 'redux-form';
import {ThunkAction} from 'redux-thunk';

import {authAPI, ResultCodes} from '../api';

import {AppStateType} from './redux-store';

const SET_USER_DATA = 'SET_USER_DATA';
const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
};

export type InitialAuthStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionsTypes): InitialAuthStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

type ActionsTypes = setAuthUserDataActionType;

type SetAuthUserDataActionPayloadType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

type setAuthUserDataActionType = {
  type: typeof SET_USER_DATA;
  payload?: SetAuthUserDataActionPayloadType;
};

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: {userId, email, login, isAuth},
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const getAuthUserData = (): ThunkType => async dispatch => {
  const response = await authAPI.me();

  if (response.resultCode === ResultCodes.Success) {
    const {id, email, login} = response.data;

    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login =
  (email: string, password: string, rememberMe: boolean): ThunkType =>
  async dispatch => {
    const response = await authAPI.login(email, password, rememberMe);

    if (response.resultCode === ResultCodes.Success) {
      await dispatch(getAuthUserData());
    } else {
      const message = response.messages.length > 0 ? response.messages[0] : 'Some error';

      dispatch(stopSubmit('login', {_error: message}));
    }
  };

export const logout = (): ThunkType => async dispatch => {
  const response = await authAPI.logout();

  if (response.data.resultCode === ResultCodes.Success) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
