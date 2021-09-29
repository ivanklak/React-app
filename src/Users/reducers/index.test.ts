import {UsersActions} from '../actions';
import usersReducer, {IUsersState} from '../reducers';

const state: IUsersState = {
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
  isFetching: false,
  followingInProgress: [],
  error: null,
};

const errorMessage = 'some error';

describe('usersReducer test', () => {
  it('get users success', () => {
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

    const newState = usersReducer(state, UsersActions.getUsersSuccess(newUsers));

    expect(state.users[0].id).toBe(0);
    expect(state.users[1].id).toBe(1);

    expect(newState.users[0].id).toBe(3);
    expect(newState.users[1].id).toBe(4);
  });

  it('get users failure', () => {
    const newState = usersReducer(state, UsersActions.getUsersFailure(errorMessage));

    expect(state.error).toBeNull();
    expect(newState.error).toBe(errorMessage);
  });

  it('follow success', () => {
    const newState = usersReducer(state, UsersActions.followSuccess(1));

    expect(state.users[1].followed).toBeFalsy();
    expect(state.users[2].followed).toBeFalsy();

    expect(newState.users[1].followed).toBeTruthy();
    expect(newState.users[2].followed).toBeFalsy();
  });

  it('follow failure', () => {
    const newState = usersReducer(state, UsersActions.followFailure(errorMessage));

    expect(state.error).toBeNull();
    expect(newState.error).toBe(errorMessage);
  });

  it('unfollow success', () => {
    const newState = usersReducer(state, UsersActions.unfollowSuccess(0));

    expect(state.users[0].followed).toBeTruthy();
    expect(state.users[3].followed).toBeTruthy();

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[3].followed).toBeTruthy();
  });

  it('unfollow failure', () => {
    const newState = usersReducer(state, UsersActions.unfollowFailure(errorMessage));

    expect(state.error).toBeNull();
    expect(newState.error).toBe(errorMessage);
  });

  it('current page should be changed', () => {
    const newState = usersReducer(state, UsersActions.setCurrentPage(2));

    expect(state.currentPage).toBe(1);
    expect(newState.currentPage).toBe(2);
  });

  it('total users count should be changed', () => {
    const newState = usersReducer(state, UsersActions.setTotalUsersCount(200));

    expect(state.totalUsersCount).toBe(0);
    expect(newState.totalUsersCount).toBe(200);
  });

  it('isFetching should be equal true', () => {
    const newState = usersReducer(state, UsersActions.setToggleIsFetching(true));

    expect(state.isFetching).toBeFalsy();
    expect(newState.isFetching).toBeTruthy();
  });

  it('the user should be added to the array', () => {
    const newState = usersReducer(state, UsersActions.toggleFollowingProgress({isFetching: true, userId: 1}));

    expect(state.followingInProgress.length).toBe(0);

    expect(newState.followingInProgress.length).toBeGreaterThan(0);
    expect(newState.followingInProgress[0]).toBe(1);
  });

  it('the user should be removed from the array', () => {
    const changedState = {...state, followingInProgress: [1]};

    expect(changedState.followingInProgress.length).toBeGreaterThan(0);

    const newState = usersReducer(changedState, UsersActions.toggleFollowingProgress({isFetching: false, userId: 1}));

    expect(newState.followingInProgress.length).toBe(0);
  });
});
