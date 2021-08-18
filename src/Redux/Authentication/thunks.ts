import {FormAction} from 'redux-form/lib/actions';
import {stopSubmit} from 'redux-form';

import {IThunkResult} from '../../types';
import {authAPI, ResultCodes} from '../../api';

import {AuthenticationAction, AuthenticationActions} from './actions';

export const getAuthUserData = (): IThunkResult<Promise<void>, AuthenticationAction> => async dispatch => {
  const response = await authAPI.me();

  if (response.resultCode === ResultCodes.Success) {
    const {id, email, login} = response.data;

    dispatch(AuthenticationActions.setAuthUserData({userId: id, email, login, isAuth: true}));
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
