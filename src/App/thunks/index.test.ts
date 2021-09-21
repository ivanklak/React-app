import {authAPI, IMeResponse} from '../../Authentication/services';
import {ResultCodes} from '../services/api';
import {AuthenticationActions} from '../../Authentication/actions';
import {IAuthenticationsData} from '../../Authentication/types';
import {getAuthUserData} from '../../Authentication/thunks';

import {initializeApp} from './index';

const meResponse: IMeResponse = {
  data: {id: 999, email: 'test@gmail.com', login: 'testLogin'},
  messages: [],
  resultCode: ResultCodes.Success,
};
const authData: IAuthenticationsData = {
  userId: 999,
  email: 'test@gmail.com',
  login: 'testLogin',
  isAuth: true,
};

describe('app thunk', () => {
  let mockedGetAuthUserData: jest.SpyInstance;
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  const extraArgumentMock = jest.fn();

  beforeEach(() => {
    mockedGetAuthUserData = jest.spyOn(authAPI, 'me');
  });

  afterEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    extraArgumentMock.mockClear();
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
