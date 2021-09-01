import {IThunkResult} from '../../App/types';
import {authAPI} from '../services';
import {AuthenticationAction, AuthenticationActions} from '../actions';
import {ResultCodes} from '../../App/services/api';

export const getAuthUserData = (): IThunkResult<Promise<void>, AuthenticationAction> => async dispatch => {
  const response = await authAPI.me();

  if (response.resultCode === ResultCodes.Success) {
    const {id, email, login} = response.data;

    dispatch(AuthenticationActions.setAuthUserData({userId: id, email, login, isAuth: true}));
  }
};

export const login =
  (email: string, password: string, rememberMe: boolean): IThunkResult<Promise<void>, AuthenticationAction> =>
  async dispatch => {
    const response = await authAPI.login(email, password, rememberMe);

    if (response.resultCode === ResultCodes.Success) {
      await dispatch(getAuthUserData());
    }
  };

export const logout = (): IThunkResult<Promise<void>, AuthenticationAction> => async dispatch => {
  const response = await authAPI.logout();

  if (response.data.resultCode === ResultCodes.Success) {
    dispatch(AuthenticationActions.setAuthUserData({userId: null, email: null, login: null, isAuth: false}));
  }
};
