import {ActionsUnion} from '../../App/types';

import {createAction} from '../../App/actions/helpers';
import {IAuthenticationsData} from '../types';

export enum AuthenticationActionTypes {
  SET_USER_DATA_REQUEST = 'AUTH/SET_USER_DATA_REQUEST',
  SET_USER_DATA_SUCCESS = 'AUTH/SET_USER_DATA_SUCCESS',
  SET_USER_DATA_FAILURE = 'AUTH/SET_USER_DATA_FAILURE',
}

export const AuthenticationActions = {
  getAuthUserDataRequest: () => createAction(AuthenticationActionTypes.SET_USER_DATA_REQUEST),
  getAuthUserDataSuccess: (payload: IAuthenticationsData) => createAction(AuthenticationActionTypes.SET_USER_DATA_SUCCESS, payload),
  getAuthUserDataFailure: (payload: string) => createAction(AuthenticationActionTypes.SET_USER_DATA_FAILURE, payload),
};

export type AuthenticationAction = ActionsUnion<typeof AuthenticationActions>;
