import {IThunkResult} from '../../types/types';

import {DialogsAction, DialogsActions, DialogsActionTypes} from './actions';

export interface IMessages {
  id: number;
  message: string;
}
export interface IDialogs {
  id: number;
  name: string;
}
interface IState {
  messages: Array<IMessages>;
  dialogs: Array<IDialogs>;
}

const initialState: IState = {
  messages: [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How are you?'},
    {id: 3, message: 'Would you like some pizza?'},
    {id: 4, message: 'Yeah'},
    {id: 5, message: 'Yo'},
  ],
  dialogs: [
    {id: 1, name: 'Timofey'},
    {id: 2, name: 'Cat'},
    {id: 3, name: 'Pavel'},
    {id: 4, name: 'Anton'},
    {id: 5, name: 'Gleb'},
    {id: 6, name: 'Tolya'},
  ],
};

const dialogsReducer = (state = initialState, action: DialogsAction): IState => {
  switch (action.type) {
    case DialogsActionTypes.SEND_MESSAGE: {
      const body = action.payload;

      return {
        ...state,
        messages: [...state.messages, {id: 6, message: body}],
      };
    }

    default:
      return state;
  }
};

export const sendMessages =
  (newMessageBody: string): IThunkResult<void, DialogsAction> =>
  dispatch => {
    dispatch(DialogsActions.sendMessage(newMessageBody));
  };

export default dialogsReducer;
