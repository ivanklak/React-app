import {IGetItems, usersAPI} from '../services';
import {UsersActions} from '../actions';
import {ResultCodes} from '../../App/services/api';

import {follow, requestUsers, unfollow} from './index';

describe('users thunks tests', () => {
  let mockedGetUsers: jest.SpyInstance;
  let mockedToFollow: jest.SpyInstance;
  let mockedToUnfollow: jest.SpyInstance;
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  const extraArgumentMock = jest.fn();
  const failureResponse = {message: 'some error'};

  beforeEach(() => {
    mockedGetUsers = jest.spyOn(usersAPI, 'getUsers');
    mockedToFollow = jest.spyOn(usersAPI, 'toFollow');
    mockedToUnfollow = jest.spyOn(usersAPI, 'toUnfollow');
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

  it('success requestUsers thunk', async () => {
    mockedGetUsers.mockReturnValue(Promise.resolve(usersResponse));

    const thunk = requestUsers(1, 100);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);
    expect(dispatchMock).toBeCalledTimes(5);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, UsersActions.setToggleIsFetching(true));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, UsersActions.setCurrentPage(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, UsersActions.setToggleIsFetching(false));
    expect(dispatchMock).toHaveBeenNthCalledWith(4, UsersActions.getUsersSuccess(usersResponse.items));
    expect(dispatchMock).toHaveBeenNthCalledWith(5, UsersActions.setTotalUsersCount(usersResponse.totalCount));
  });

  it('failure requestUsers thunk', async () => {
    mockedGetUsers.mockReturnValue(Promise.reject(failureResponse));

    const thunk = requestUsers(1, 100);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);
    expect(dispatchMock).toBeCalledTimes(3);

    expect(dispatchMock).toHaveBeenNthCalledWith(1, UsersActions.setToggleIsFetching(true));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, UsersActions.setCurrentPage(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, UsersActions.getUsersFailure(failureResponse.message));
  });

  it('success follow thunk', async () => {
    mockedToFollow.mockReturnValue(Promise.resolve(defaultResponse));

    const thunk = follow(0);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, UsersActions.toggleFollowingProgress({isFetching: true, userId: 0}));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, UsersActions.followSuccess(0));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, UsersActions.toggleFollowingProgress({isFetching: false, userId: 0}));
  });

  it('failure follow thunk', async () => {
    mockedToFollow.mockReturnValue(Promise.reject(failureResponse));

    const thunk = follow(0);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);
    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, UsersActions.toggleFollowingProgress({isFetching: true, userId: 0}));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, UsersActions.followFailure(failureResponse.message));
  });

  it('success unfollow thunk', async () => {
    mockedToUnfollow.mockReturnValue(Promise.resolve(defaultResponse));

    const thunk = unfollow(0);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, UsersActions.toggleFollowingProgress({isFetching: true, userId: 0}));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, UsersActions.unfollowSuccess(0));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, UsersActions.toggleFollowingProgress({isFetching: false, userId: 0}));
  });

  it('failure unfollow thunk', async () => {
    mockedToUnfollow.mockReturnValue(Promise.reject(failureResponse));

    const thunk = unfollow(0);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);
    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, UsersActions.toggleFollowingProgress({isFetching: true, userId: 0}));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, UsersActions.unfollowFailure(failureResponse.message));
  });
});
