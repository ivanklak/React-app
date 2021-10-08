import {DialogsActions} from '../actions';
import {sendMessages} from '../thunks';

describe('dialogs thunk', () => {
  const message = 'test message';

  let dispatchMock: jest.Mock;
  let getStateMock: jest.Mock;
  let extraArgumentMock: jest.Mock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    getStateMock = jest.fn();
    extraArgumentMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('send message', async () => {
    const thunk = sendMessages(message);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith(DialogsActions.sendMessage(message));
  });
});
