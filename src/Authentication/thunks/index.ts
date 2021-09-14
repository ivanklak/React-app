import {IThunkResult} from '../../App/types';
import {authAPI} from '../services';
import {AuthenticationAction, AuthenticationActions} from '../actions';
import {ResultCodes} from '../../App/services/api';

export const getAuthUserData = (): IThunkResult<Promise<void>, AuthenticationAction> => async dispatch => {
  dispatch(AuthenticationActions.getAuthUserDataRequest());
  try {
    const response = await authAPI.me();

    if (response.resultCode === ResultCodes.Success) {
      const {id, email, login} = response.data;

      dispatch(AuthenticationActions.getAuthUserDataSuccess({userId: id, email, login, isAuth: true}));
    }
  } catch (error) {
    const result = (error as Error).message;

    dispatch(AuthenticationActions.getAuthUserDataFailure(result));
  }
};

export const login =
  (email: string, password: string, rememberMe: boolean): IThunkResult<Promise<void>, AuthenticationAction> =>
  async dispatch => {
    try {
      const response = await authAPI.login(email, password, rememberMe);

      if (response.resultCode === ResultCodes.Success) {
        await dispatch(getAuthUserData());
      }
    } catch (error) {
      const result = (error as Error).message;

      dispatch(AuthenticationActions.getAuthUserDataFailure(result));
    }
  };

export const logout = (): IThunkResult<Promise<void>, AuthenticationAction> => async dispatch => {
  try {
    const response = await authAPI.logout();

    if (response.resultCode === ResultCodes.Success) {
      dispatch(AuthenticationActions.getAuthUserDataSuccess({userId: null, email: null, login: null, isAuth: false}));
    }
  } catch (error) {
    const result = (error as Error).message;

    dispatch(AuthenticationActions.getAuthUserDataFailure(result));
  }
};
