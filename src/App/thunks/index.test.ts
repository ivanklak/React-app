import {authAPI} from '../../Authentication/services';
import {AuthenticationActions} from '../../Authentication/actions';
import {getAuthUserData} from '../../Authentication/thunks';

import {initializeApp} from '../thunks';
import {mockAuthData, mockMeResponse} from '../helpers/test';

const meResponse = mockMeResponse();
const authData = mockAuthData();

describe('app thunk', () => {
  let mockedGetAuthUserData: jest.SpyInstance;
  let dispatchMock: jest.Mock;
  let getStateMock: jest.Mock;
  let extraArgumentMock: jest.Mock;

  beforeEach(() => {
    mockedGetAuthUserData = jest.spyOn(authAPI, 'me');
    dispatchMock = jest.fn();
    getStateMock = jest.fn();
    extraArgumentMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('initializeApp thunk', async () => {
    const thunk = initializeApp();

    const getAuth = async () => {
      mockedGetAuthUserData.mockReturnValue(Promise.resolve(meResponse));

      const authThunk = getAuthUserData();

      await authThunk(dispatchMock, getStateMock, extraArgumentMock);

      expect(dispatchMock).toBeCalledTimes(2);
      expect(dispatchMock).toHaveBeenNthCalledWith(2, AuthenticationActions.getAuthUserDataSuccess(authData));
    };

    await Promise.all([getAuth()]);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);

    expect(dispatchMock).toBeCalledTimes(3);
  });
});
