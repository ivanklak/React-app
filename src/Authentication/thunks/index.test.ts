import {authAPI} from '../services';

import {AuthenticationActions} from '../actions';
import {IAuthenticationsData} from '../types';
import {getAuthUserData, login, logout} from '../thunks';
import {mockAuthData, mockLoginData, mockLoginResponse, mockMeResponse} from '../helpers/test';

const meResponse = mockMeResponse();
const loginResponse = mockLoginResponse();
const authData = mockAuthData();
const loginData = mockLoginData();
const logoutData: IAuthenticationsData = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
};
const failureResponse = {message: 'some error'};

describe('auth thunks', () => {
  let mockedGetAuthUserData: jest.SpyInstance;
  let mockedLogin: jest.SpyInstance;
  let mockedLogout: jest.SpyInstance;
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  const extraArgumentMock = jest.fn();

  beforeEach(() => {
    mockedGetAuthUserData = jest.spyOn(authAPI, 'me');
    mockedLogin = jest.spyOn(authAPI, 'login');
    mockedLogout = jest.spyOn(authAPI, 'logout');
  });

  afterEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    extraArgumentMock.mockClear();
  });

  it('success getAuthUserData thunk', async () => {
    mockedGetAuthUserData.mockReturnValue(Promise.resolve(meResponse));

    const thunk = getAuthUserData();

    await thunk(dispatchMock, getStateMock, extraArgumentMock);

    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, AuthenticationActions.getAuthUserDataRequest());
    expect(dispatchMock).toHaveBeenNthCalledWith(2, AuthenticationActions.getAuthUserDataSuccess(authData));
  });

  it('failure getAuthUserData thunk ', async () => {
    mockedGetAuthUserData.mockReturnValue(Promise.reject(failureResponse));

    const thunk = getAuthUserData();

    await thunk(dispatchMock, getStateMock, extraArgumentMock);

    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, AuthenticationActions.getAuthUserDataRequest());
    expect(dispatchMock).toHaveBeenNthCalledWith(2, AuthenticationActions.getAuthUserDataFailure(failureResponse.message));
  });

  it('success login thunk', async () => {
    mockedLogin.mockReturnValue(Promise.resolve(loginResponse));

    const thunk = login(loginData);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);

    expect(dispatchMock).toBeCalledTimes(1);
  });

  it('failure login thunk', async () => {
    mockedLogin.mockReturnValue(Promise.reject(failureResponse));

    const thunk = login(loginData);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith(AuthenticationActions.getAuthUserDataFailure(failureResponse.message));
  });

  it('success logout thunk', async () => {
    mockedLogout.mockReturnValue(Promise.resolve(loginResponse));

    const thunk = logout();

    await thunk(dispatchMock, getStateMock, extraArgumentMock);

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith(AuthenticationActions.getAuthUserDataSuccess(logoutData));
  });

  it('failure logout thunk', async () => {
    mockedLogout.mockReturnValue(Promise.reject(failureResponse));

    const thunk = logout();

    await thunk(dispatchMock, getStateMock, extraArgumentMock);

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith(AuthenticationActions.getAuthUserDataFailure(failureResponse.message));
  });
});
