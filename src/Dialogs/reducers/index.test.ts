import {DialogsActions} from '../actions';
import dialogsReducer, {initialState} from '../reducers';

describe('dialogsReducer', () => {
  const state = initialState;
  const message = 'test message';

  it('send message', () => {
    const newState = dialogsReducer(state, DialogsActions.sendMessage(message));

    expect(state.messages.length).toBe(5);
    expect(newState.messages.length).toBe(6);
    expect(newState.messages[5].message).toBe(message);
  });
});
