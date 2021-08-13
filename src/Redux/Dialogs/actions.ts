import {ActionsUnion} from '../../types/types';

import {createAction} from '../action-helper';

export enum ActionTypes {
  SEND_MESSAGE = 'dialogs/SEND_MESSAGE',
}

export const Actions = {
  sendMessage: (newMessageBody: string) => createAction(ActionTypes.SEND_MESSAGE, newMessageBody),
};

export type Actions = ActionsUnion<typeof Actions>;
