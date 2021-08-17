import {IThunkResult} from '../../types';

import {DialogsAction, DialogsActions} from './actions';

export const sendMessages =
  (newMessageBody: string): IThunkResult<void, DialogsAction> =>
  dispatch => {
    dispatch(DialogsActions.sendMessage(newMessageBody));
  };
