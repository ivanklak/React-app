import {ResultCodes} from '../../App/services/api';
import {ILoginFormData} from '../types';

import {authAPI, IDefaultResponse, ILoginResponse, IMeResponse} from './index';

const loginData: ILoginFormData = {
  email: 'ivanklak17@gmail.com',
  password: 'test-password',
  rememberMe: true,
};

describe('authAPI', () => {
  let mockedGetAuthUserData: jest.SpyInstance;
  let mockedLogin: jest.SpyInstance;
  let mockedLogout: jest.SpyInstance;
  let defaultResponse: IDefaultResponse;
  let meResponse: IMeResponse;
  let loginResponse: ILoginResponse;

  beforeEach(() => {
    mockedGetAuthUserData = jest.spyOn(authAPI, 'me');
    mockedLogin = jest.spyOn(authAPI, 'login');
    mockedLogout = jest.spyOn(authAPI, 'logout');
    defaultResponse = {
      data: {},
      messages: [],
      resultCode: ResultCodes.Success,
    };
    meResponse = {
      data: {id: 9208, email: 'ivanklak17@gmail.com', login: 'ivanklak'},
      messages: [],
      resultCode: ResultCodes.Success,
    };
    loginResponse = {
      data: {userId: 9208},
      messages: [],
      resultCode: ResultCodes.Success,
    };
  });

  it('return auth users data from backend', async () => {
    mockedGetAuthUserData.mockReturnValue(Promise.resolve(meResponse));

    const data = await authAPI.me();

    expect(data).toEqual(meResponse);
  });

  it('return login', async () => {
    mockedLogin.mockReturnValue(Promise.resolve(loginResponse));

    const data = await authAPI.login(loginData.email, loginData.password, loginData.rememberMe);

    expect(data).toEqual(loginResponse);
  });

  it('return logout', async () => {
    mockedLogout.mockReturnValue(Promise.resolve(defaultResponse));

    const data = await authAPI.logout();

    expect(data).toEqual(defaultResponse);
  });
});
