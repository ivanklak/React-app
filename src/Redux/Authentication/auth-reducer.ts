import {stopSubmit} from 'redux-form';
import {ThunkAction} from 'redux-thunk';
import {FormAction} from 'redux-form/lib/actions';

import {authAPI, ResultCodes} from '../../api';

import {AppStateType} from '../redux-store';

import {AuthenticationActionTypes, AuthenticationActions, AuthenticationAction} from './actions';

export interface IState {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
}

const initialState: IState = {
  userId: null,
  email: '',
  login: '',
  isAuth: false,
};

const authReducer = (state = initialState, action: AuthenticationAction): IState => {
  switch (action.type) {
    case AuthenticationActionTypes.SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

type IThunk = ThunkAction<Promise<void>, AppStateType, unknown, AuthenticationAction>;

export const getAuthUserData = (): IThunk => async dispatch => {
  const response = await authAPI.me();

  if (response.resultCode === ResultCodes.Success) {
    const {id, email, login} = response.data;

    dispatch(AuthenticationActions.setAuthUserData({userId: id, email: email, login: login, isAuth: true}));
  }
};

type IThunkForm = ThunkAction<Promise<void>, AppStateType, unknown, FormAction>;

export const login =
  (email: string, password: string, rememberMe: boolean): IThunkForm =>
  async dispatch => {
    const response = await authAPI.login(email, password, rememberMe);

    if (response.resultCode === ResultCodes.Success) {
      await dispatch(getAuthUserData());
    } else {
      const message = response.messages.length > 0 ? response.messages[0] : 'Some error';

      dispatch(stopSubmit('login', {_error: message}));
    }
  };

export const logout = (): IThunk => async dispatch => {
  const response = await authAPI.logout();

  if (response.data.resultCode === ResultCodes.Success) {
    dispatch(AuthenticationActions.setAuthUserData({userId: null, email: null, login: null, isAuth: false}));
  }
};

export default authReducer;
