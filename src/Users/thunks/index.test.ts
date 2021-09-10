import {IGetItems, usersAPI} from '../services';
import {UsersActions} from '../actions';
import {ResultCodes} from '../../App/services/api';

import {follow, requestUsers, unfollow} from './index';

jest.mock('../services');
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

describe('users thunks tests', () => {
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  const extraArgumentMock = jest.fn();

  beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    extraArgumentMock.mockClear();
  });

  const usersResponse: IGetItems = {
    items: [
      {
        id: 0,
        name: 'Post Malone',
        status: 'status 0',
        followed: true,
        photos: {small: null, large: null},
      },
    ],
    totalCount: 1,
    error: null,
  };

  const defaultResponse = {
    data: {},
    messages: [],
    resultCode: ResultCodes.Success,
  };

  usersAPIMock.getUsers.mockReturnValue(Promise.resolve(usersResponse));
  usersAPIMock.toFollow.mockReturnValue(Promise.resolve(defaultResponse));
  usersAPIMock.toUnfollow.mockReturnValue(Promise.resolve(defaultResponse));

  it('success requestUsers thunk', async () => {
    const thunk = requestUsers(1, 100);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);
    expect(dispatchMock).toBeCalledTimes(5);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, UsersActions.setToggleIsFetching(true));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, UsersActions.setCurrentPage(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, UsersActions.setToggleIsFetching(false));
    expect(dispatchMock).toHaveBeenNthCalledWith(4, UsersActions.setUsers(usersResponse.items));
    expect(dispatchMock).toHaveBeenNthCalledWith(5, UsersActions.setTotalUsersCount(usersResponse.totalCount));
  });

  it('success follow thunk', async () => {
    const thunk = follow(0);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, UsersActions.toggleFollowingProgress({isFetching: true, userId: 0}));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, UsersActions.followSuccess(0));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, UsersActions.toggleFollowingProgress({isFetching: false, userId: 0}));
  });

  it('success unfollow thunk', async () => {
    const thunk = unfollow(0);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, UsersActions.toggleFollowingProgress({isFetching: true, userId: 0}));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, UsersActions.unfollowSuccess(0));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, UsersActions.toggleFollowingProgress({isFetching: false, userId: 0}));
  });
});
