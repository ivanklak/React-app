import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';

import {ResultCodes} from '../../App/services/api';
import {reducers} from '../../App/redux-store';
import {ILoginResponse, IMeResponse} from '../services';
import {IAuthenticationsData, ILoginFormData} from '../types';

export const mockMeResponse = (overrides: Partial<IMeResponse> = {}): IMeResponse => ({
  data: {id: 999, email: 'test@gmail.com', login: 'testLogin'},
  messages: [],
  resultCode: ResultCodes.Success,
  ...overrides,
});

export const mockLoginResponse = (overrides: Partial<ILoginResponse> = {}): ILoginResponse => ({
  data: {userId: 999},
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

export const mockLoginData = (overrides: Partial<ILoginFormData> = {}): ILoginFormData => ({
  email: 'test@gmail.com',
  password: 'test-password',
  rememberMe: true,
  ...overrides,
});

export const reduxStore = () => {
  const middlewares = [thunk];

  return createStore(reducers, applyMiddleware(...middlewares));
};
