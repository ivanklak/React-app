import {ActionsUnion} from '../../types/types';

import {createAction} from '../action-helper';

export enum ActionTypes {
  INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS',
}

export const Actions = {
  initializedSuccess: () => createAction(ActionTypes.INITIALIZED_SUCCESS),
};

export type Actions = ActionsUnion<typeof Actions>;
