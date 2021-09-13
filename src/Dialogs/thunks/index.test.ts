import {DialogsActions} from '../actions';

import {sendMessages} from './index';

describe('dialogs thunk', () => {
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  const extraArgumentMock = jest.fn();
  const message = 'test message';

  it('send message', async () => {
    const thunk = sendMessages(message);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith(DialogsActions.sendMessage(message));
  });
});
