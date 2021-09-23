import {authAPI} from '../../Authentication/services';
import {AuthenticationActions} from '../../Authentication/actions';
import {getAuthUserData} from '../../Authentication/thunks';

import {initializeApp} from '../thunks';
import {mockAuthData, mockMeResponse} from '../helpers/test';

const meResponse = mockMeResponse();
const authData = mockAuthData();

describe('app thunk', () => {
  const mockedGetAuthUserData: jest.SpyInstance = jest.spyOn(authAPI, 'me');
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  const extraArgumentMock = jest.fn();

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
