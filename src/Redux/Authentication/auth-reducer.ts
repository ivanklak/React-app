import {stopSubmit} from 'redux-form';
import {ThunkAction} from 'redux-thunk';
import {FormAction} from 'redux-form/lib/actions';

import {authAPI, ResultCodes} from '../../api';

import {AppStateType} from '../redux-store';

import * as fromActions from './actions';

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

const authReducer = (state = initialState, action: fromActions.Actions): IState => {
  switch (action.type) {
    case fromActions.ActionTypes.SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

type IThunk = ThunkAction<Promise<void>, AppStateType, unknown, fromActions.Actions>;

export const getAuthUserData = (): IThunk => async dispatch => {
  const response = await authAPI.me();

  if (response.resultCode === ResultCodes.Success) {
    const {id, email, login} = response.data;

    dispatch(fromActions.Actions.setAuthUserData(id, email, login, true));
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
    dispatch(fromActions.Actions.setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
