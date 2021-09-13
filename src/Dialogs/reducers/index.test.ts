import store from '../../App/redux-store';

import {DialogsActions} from '../actions';

import dialogsReducer from './index';

describe('dialogsReducer', () => {
  const state = store.getState().dialogsPage;
  const message = 'test message';

  it('send message', () => {
    const newState = dialogsReducer(state, DialogsActions.sendMessage(message));

    expect(newState.messages.length).toBe(6);
    expect(newState.messages[5].message).toBe(message);
  });
});
