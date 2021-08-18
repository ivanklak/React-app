import {ActionsUnion} from '../types';

import {createAction} from './helpers';

export enum AppActionTypes {
  INITIALIZED_SUCCESS = 'APP/INITIALIZED_SUCCESS',
}

export const AppActions = {
  initializedSuccess: () => createAction(AppActionTypes.INITIALIZED_SUCCESS),
};

export type AppAction = ActionsUnion<typeof AppActions>;
