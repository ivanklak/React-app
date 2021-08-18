import {ActionsUnion} from '../../types';

import {createAction} from '../action-helper';

export enum DialogsActionTypes {
  SEND_MESSAGE = 'DIALOGS/SEND_MESSAGE',
}

export const DialogsActions = {
  sendMessage: (payload: string) => createAction(DialogsActionTypes.SEND_MESSAGE, payload),
};

export type DialogsAction = ActionsUnion<typeof DialogsActions>;
