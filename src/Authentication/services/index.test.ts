import {ResultCodes} from '../../App/services/api';
import {authAPI, IDefaultResponse} from '../services';
import {mockLoginData, mockLoginResponse, mockMeResponse} from '../helpers/test';

const meResponse = mockMeResponse();
const loginResponse = mockLoginResponse();
const loginData = mockLoginData();
const defaultResponse: IDefaultResponse = {
  data: {},
  messages: [],
  resultCode: ResultCodes.Success,
};

describe('authAPI', () => {
  let mockedGetAuthUserData: jest.SpyInstance;
  let mockedLogin: jest.SpyInstance;
  let mockedLogout: jest.SpyInstance;

  beforeAll(() => {
    mockedGetAuthUserData = jest.spyOn(authAPI, 'me');
    mockedLogin = jest.spyOn(authAPI, 'login');
    mockedLogout = jest.spyOn(authAPI, 'logout');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('return auth users data from backend', async () => {
    mockedGetAuthUserData.mockReturnValue(Promise.resolve(meResponse));

    const data = await authAPI.me();

    expect(data).toEqual(meResponse);
  });

  it('return login', async () => {
    mockedLogin.mockReturnValue(Promise.resolve(loginResponse));

    const data = await authAPI.login(loginData);

    expect(data).toEqual(loginResponse);
  });

  it('return logout', async () => {
    mockedLogout.mockReturnValue(Promise.resolve(defaultResponse));

    const data = await authAPI.logout();

    expect(data).toEqual(defaultResponse);
  });
});
