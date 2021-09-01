import {IGetItems, usersAPI} from '../services';
import {UsersActions} from '../actions';

import {requestUsers} from './index';

jest.mock('../services');
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

describe('users thunks tests', () => {
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

  usersAPIMock.getUsers.mockReturnValue(Promise.resolve(usersResponse));

  test('requestUsers ', async () => {
    const thunk = requestUsers(1, 100);
    const dispatchMock = jest.fn();
    const getState = jest.fn();
    const extraArgument = jest.fn();

    await thunk(dispatchMock, getState, extraArgument);
    expect(dispatchMock).toBeCalledTimes(5);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, UsersActions.setToggleIsFetching(true));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, UsersActions.setCurrentPage(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, UsersActions.setToggleIsFetching(false));
    expect(dispatchMock).toHaveBeenNthCalledWith(4, UsersActions.setUsers(usersResponse.items));
    expect(dispatchMock).toHaveBeenNthCalledWith(5, UsersActions.setTotalUsersCount(usersResponse.totalCount));
  });
});
