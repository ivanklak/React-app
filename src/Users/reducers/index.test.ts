import {UsersActions} from '../actions';

import usersReducer, {IUsersState} from './index';

test('length of users should be incremented', () => {
  const state: IUsersState = {
    users: [],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
  };

  const newUsers = [
    {
      id: 0,
      name: 'Michael Scofield',
      status: 'status 0',
      followed: true,
      photos: {small: null, large: null},
    },
    {
      id: 1,
      name: 'Alexander Mahone',
      status: 'status 1',
      followed: false,
      photos: {small: null, large: null},
    },
  ];

  const newState = usersReducer(state, UsersActions.setUsers(newUsers));

  expect(newState.users.length).toBeGreaterThan(0);
});
