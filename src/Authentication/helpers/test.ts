import {ILoginResponse, IMeResponse} from '../services';
import {ResultCodes} from '../../App/services/api';
import {IAuthenticationsData, ILoginFormData} from '../types';

export const mockMeResponse = (overrides: Partial<IMeResponse> = {}) => ({
  data: {id: 999, email: 'test@gmail.com', login: 'testLogin'},
  messages: [],
  resultCode: ResultCodes.Success,
  ...overrides,
});

export const mockLoginResponse = (overrides: Partial<ILoginResponse> = {}) => ({
  data: {userId: 999},
  messages: [],
  resultCode: ResultCodes.Success,
  ...overrides,
});

export const mockAuthData = (overrides: Partial<IAuthenticationsData> = {}) => ({
  userId: 999,
  email: 'test@gmail.com',
  login: 'testLogin',
  isAuth: true,
  ...overrides,
});

export const mockLoginData = (overrides: Partial<ILoginFormData> = {}) => ({
  email: 'test@gmail.com',
  password: 'test-password',
  rememberMe: true,
  ...overrides,
});
