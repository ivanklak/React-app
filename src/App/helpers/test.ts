import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';

import {IMeResponse} from '../../Authentication/services';
import {IAuthenticationsData} from '../../Authentication/types';
import {ResultCodes} from '../services/api';
import {reducers} from '../redux-store';

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

export const reduxStore = () => {
  const middlewares = [thunk];

  return createStore(reducers, applyMiddleware(...middlewares));
};
