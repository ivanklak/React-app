import {ResultCodes} from '../../App/services/api';

import {IDefaultResponse, IGetItems, usersAPI} from './index';

const defaultResponse: IDefaultResponse = {
  data: {},
  messages: [],
  resultCode: ResultCodes.Success,
};

const usersResponse: IGetItems = {
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
  totalCount: 4,
  error: null,
};

describe('usersAPI test', () => {
  let mockedGetUsers: jest.SpyInstance;
  let mockedToFollow: jest.SpyInstance;
  let mockedToUnfollow: jest.SpyInstance;

  beforeEach(() => {
    mockedGetUsers = jest.spyOn(usersAPI, 'getUsers');
    mockedToFollow = jest.spyOn(usersAPI, 'toFollow');
    mockedToUnfollow = jest.spyOn(usersAPI, 'toUnfollow');
  });

  test('return users from backend', async () => {
    mockedGetUsers.mockReturnValue(Promise.resolve(usersResponse));
    const data = await usersAPI.getUsers(1, 10);

    expect(data).toEqual(usersResponse);
  });

  test('return data after following user', async () => {
    mockedToFollow.mockReturnValue(Promise.resolve(defaultResponse));
    const data = await usersAPI.toFollow(2);

    expect(data.resultCode).toBe(defaultResponse.resultCode);
  });

  test('return data after unfollowing user', async () => {
    mockedToUnfollow.mockReturnValue(Promise.resolve(defaultResponse));
    const data = await usersAPI.toUnfollow(2);

    expect(data.resultCode).toBe(defaultResponse.resultCode);
  });
});
