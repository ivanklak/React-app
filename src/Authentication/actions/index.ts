import {ActionsUnion} from '../../App/types';

import {createAction} from '../../App/actions/helpers';
import {IAuthenticationsData} from '../types';

export enum AuthenticationActionTypes {
  SET_USER_DATA = 'AUTH/SET_USER_DATA',
}

export const AuthenticationActions = {
  setAuthUserData: (payload: IAuthenticationsData) => createAction(AuthenticationActionTypes.SET_USER_DATA, payload),
};

export type AuthenticationAction = ActionsUnion<typeof AuthenticationActions>;
