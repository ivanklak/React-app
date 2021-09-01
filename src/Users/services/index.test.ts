import {ResultCodes} from '../../App/services/api';

import {IDefaultResponse, IGetItems, usersAPI} from './index';

jest.mock('./index');
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

describe('usersAPI test', () => {
  let defaultResponse: IDefaultResponse;
  let usersResponse: IGetItems;

  beforeEach(() => {
    usersResponse = {
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
    defaultResponse = {
      data: {},
      messages: [],
      resultCode: ResultCodes.Success,
    };
  });

  test('return users from backend', async () => {
    userAPIMock.getUsers.mockReturnValue(Promise.resolve(usersResponse));
    const data = await usersAPI.getUsers(1, 10);

    expect(data).toEqual(usersResponse);
  });

  test('return data after following user', async () => {
    userAPIMock.toFollow.mockReturnValue(Promise.resolve(defaultResponse));
    const data = await usersAPI.toFollow(2);

    expect(data.resultCode).toBe(defaultResponse.resultCode);
  });

  test('return data after unfollowing user', async () => {
    userAPIMock.toUnfollow.mockReturnValue(Promise.resolve(defaultResponse));
    const data = await usersAPI.toUnfollow(2);

    expect(data.resultCode).toBe(defaultResponse.resultCode);
  });
});
