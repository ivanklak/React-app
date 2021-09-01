import {UsersActions} from '../actions';

import usersReducer, {IUsersState} from './index';

describe('usersReducer test', () => {
  let state: IUsersState;

  beforeEach(() => {
    state = {
      users: [
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
      pageSize: 100,
      totalUsersCount: 0,
      currentPage: 1,
      isFetching: true,
      followingInProgress: [],
    };
  });

  test('users should be changed', () => {
    const newUsers = [
      {
        id: 3,
        name: 'Michael Scofield',
        status: 'status 3',
        followed: true,
        photos: {small: null, large: null},
      },
      {
        id: 4,
        name: 'Alexander Mahone',
        status: 'status 4',
        followed: false,
        photos: {small: null, large: null},
      },
    ];

    const newState = usersReducer(state, UsersActions.setUsers(newUsers));

    expect(newState.users[0].id).toBe(3);
    expect(newState.users[1].id).toBe(4);
  });

  test('follow success', () => {
    const newState = usersReducer(state, UsersActions.followSuccess(1));

    expect(newState.users[1].followed).toBeTruthy();
    expect(newState.users[2].followed).toBeFalsy();
  });

  test('unfollow success', () => {
    const newState = usersReducer(state, UsersActions.unfollowSuccess(0));

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[3].followed).toBeTruthy();
  });

  test('current page should be changed', () => {
    const newState = usersReducer(state, UsersActions.setCurrentPage(2));

    expect(newState.currentPage).toBe(2);
  });

  test('total users count should be changed', () => {
    const newState = usersReducer(state, UsersActions.setTotalUsersCount(200));

    expect(newState.totalUsersCount).toBe(200);
  });

  test('isFetching should be falsy', () => {
    const newState = usersReducer(state, UsersActions.setToggleIsFetching(false));

    expect(newState.isFetching).toBeFalsy();
  });

  test('the user should be added to the array', () => {
    const newState = usersReducer(state, UsersActions.toggleFollowingProgress({isFetching: true, userId: 1}));

    expect(newState.followingInProgress.length).toBeGreaterThan(0);
    expect(newState.followingInProgress[0]).toBe(1);
  });

  test('the user should be removed from the array', () => {
    const changedState = {...state, followingInProgress: [1]};
    const newState = usersReducer(changedState, UsersActions.toggleFollowingProgress({isFetching: false, userId: 1}));

    expect(newState.followingInProgress.length).toBe(0);
  });
});
