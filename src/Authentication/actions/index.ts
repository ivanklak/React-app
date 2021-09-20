import {ActionsUnion} from '../../App/types';

import {createAction} from '../../App/actions/helpers';
import {IAuthenticationsData} from '../types';

export enum AuthenticationActionTypes {
  GET_USER_DATA_REQUEST = 'AUTH/GET_USER_DATA_REQUEST',
  GET_USER_DATA_SUCCESS = 'AUTH/GET_USER_DATA_SUCCESS',
  GET_USER_DATA_FAILURE = 'AUTH/GET_USER_DATA_FAILURE',
}

export const AuthenticationActions = {
  getAuthUserDataRequest: () => createAction(AuthenticationActionTypes.GET_USER_DATA_REQUEST),
  getAuthUserDataSuccess: (payload: IAuthenticationsData) => createAction(AuthenticationActionTypes.GET_USER_DATA_SUCCESS, payload),
  getAuthUserDataFailure: (payload: string) => createAction(AuthenticationActionTypes.GET_USER_DATA_FAILURE, payload),
};

export type AuthenticationAction = ActionsUnion<typeof AuthenticationActions>;
