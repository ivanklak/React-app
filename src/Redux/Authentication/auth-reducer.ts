import {stopSubmit} from 'redux-form';
import {FormAction} from 'redux-form/lib/actions';

import {authAPI, ResultCodes} from '../../api';
import {IThunkResult} from '../../types/types';

import {AuthenticationAction, AuthenticationActions, AuthenticationActionTypes} from './actions';

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

export const getAuthUserData = (): IThunkResult<Promise<void>, AuthenticationAction> => async dispatch => {
  const response = await authAPI.me();

  if (response.resultCode === ResultCodes.Success) {
    const {id, email, login} = response.data;

    dispatch(AuthenticationActions.setAuthUserData({userId: id, email: email, login: login, isAuth: true}));
  }
};

export const login =
  (email: string, password: string, rememberMe: boolean): IThunkResult<Promise<void>, FormAction> =>
  async dispatch => {
    const response = await authAPI.login(email, password, rememberMe);

    if (response.resultCode === ResultCodes.Success) {
      await dispatch(getAuthUserData());
    } else {
      const message = response.messages.length > 0 ? response.messages[0] : 'Some error';

      dispatch(stopSubmit('login', {_error: message}));
    }
  };

export const logout = (): IThunkResult<Promise<void>, AuthenticationAction> => async dispatch => {
  const response = await authAPI.logout();

  if (response.data.resultCode === ResultCodes.Success) {
    dispatch(AuthenticationActions.setAuthUserData({userId: null, email: null, login: null, isAuth: false}));
  }
};

export default authReducer;
