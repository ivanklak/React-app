import {ActionsUnion} from '../../App/types';

import {createAction} from '../../App/actions/helpers';

export enum DialogsActionTypes {
  SEND_MESSAGE = 'DIALOGS/SEND_MESSAGE',
}

export const DialogsActions = {
  sendMessage: (payload: string) => createAction(DialogsActionTypes.SEND_MESSAGE, payload),
};

export type DialogsAction = ActionsUnion<typeof DialogsActions>;
