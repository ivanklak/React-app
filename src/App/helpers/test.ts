import {IMeResponse} from '../../Authentication/services';
import {ResultCodes} from '../services/api';
import {IAuthenticationsData} from '../../Authentication/types';

export const mockMeResponse = (overrides: Partial<IMeResponse> = {}): IMeResponse => ({
  data: {id: 999, email: 'test@gmail.com', login: 'testLogin'},
  messages: [],
  resultCode: ResultCodes.Success,
  ...overrides,
});

export const mockAuthData = (overrides: Partial<IAuthenticationsData> = {}): IAuthenticationsData => ({
  userId: 999,
  email: 'test@gmail.com',
  login: 'testLogin',
  isAuth: true,
  ...overrides,
});
