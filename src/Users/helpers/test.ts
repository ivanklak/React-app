import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import {IDefaultResponse, IGetItems} from '../services';
import {ResultCodes} from '../../App/services/api';
import {reducers} from '../../App/redux-store';

export const mockDefaultResponse = (overrides: Partial<IDefaultResponse> = {}): IDefaultResponse => ({
  data: {},
  messages: [],
  resultCode: ResultCodes.Success,
  ...overrides,
});

export const mockUsersResponse = (overrides: Partial<IGetItems> = {}): IGetItems => ({
  items: [
    {
      id: 0,
      name: 'Post Malone',
      status: 'status 0',
      followed: true,
      photos: {small: null, large: null},
    },
    {
      id: 1,
      name: 'Dipper Pines',
      status: 'status 1',
      followed: false,
      photos: {small: null, large: null},
    },
    {
      id: 2,
      name: 'Mable Pines',
      status: 'status 2',
      followed: false,
      photos: {small: null, large: null},
    },
    {
      id: 3,
      name: 'Miss Tokyo',
      status: 'status 3',
      followed: true,
      photos: {small: null, large: null},
    },
  ],
  totalCount: 154,
  error: null,
  ...overrides,
});

export const reduxStore = () => {
  const middlewares = [thunk];

  return createStore(reducers, applyMiddleware(...middlewares));
};
