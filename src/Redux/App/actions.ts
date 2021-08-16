import {ActionsUnion} from '../../types/types';

import {createAction} from '../action-helper';

export enum AppActionTypes {
  INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS',
}

export const AppActions = {
  initializedSuccess: () => createAction(AppActionTypes.INITIALIZED_SUCCESS),
};

export type AppAction = ActionsUnion<typeof AppActions>;
