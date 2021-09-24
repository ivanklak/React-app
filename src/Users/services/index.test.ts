import {mockDefaultResponse, mockUsersResponse} from '../helpers/test';

import {usersAPI} from '../services';

const defaultResponse = mockDefaultResponse();
const usersResponse = mockUsersResponse();

describe('usersAPI test', () => {
  let mockedGetUsers: jest.SpyInstance;
  let mockedToFollow: jest.SpyInstance;
  let mockedToUnfollow: jest.SpyInstance;

  beforeAll(() => {
    mockedGetUsers = jest.spyOn(usersAPI, 'getUsers');
    mockedToFollow = jest.spyOn(usersAPI, 'toFollow');
    mockedToUnfollow = jest.spyOn(usersAPI, 'toUnfollow');
  });

  test('return users from backend', async () => {
    mockedGetUsers.mockReturnValue(Promise.resolve(usersResponse));
    const data = await usersAPI.getUsers({currentPage: 1, pageSize: 100});

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
