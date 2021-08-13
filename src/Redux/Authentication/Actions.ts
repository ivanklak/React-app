import {ActionsUnion} from '../../types/types';

import {createAction} from '../action-helper';

export enum ActionTypes {
  SET_USER_DATA = 'auth/SET_USER_DATA',
}

export const Actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    createAction(ActionTypes.SET_USER_DATA, {userId, email, login, isAuth}),
};

export type Actions = ActionsUnion<typeof Actions>;
