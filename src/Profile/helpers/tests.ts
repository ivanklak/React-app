import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';

import {ResultCodes} from '../../App/services/api';
import {reducers} from '../../App/redux-store';

import {IProfile} from '../types';
import {IDefaultResponse} from '../services';

export const mockProfileResponse = (overrides: Partial<IProfile> = {}): IProfile => ({
  userId: 999,
  lookingForAJob: false,
  lookingForAJobDescription: 'test',
  fullName: 'testName',
  contacts: null,
  photos: {small: null, large: null},
  ...overrides,
});

export const mockDefaultResponse = (overrides: Partial<IDefaultResponse> = {}): IDefaultResponse => ({
  data: {},
  messages: [],
  resultCode: ResultCodes.Success,
  ...overrides,
});

export const reduxStore = () => {
  const middlewares = [thunk];

  return createStore(reducers, applyMiddleware(...middlewares));
};
