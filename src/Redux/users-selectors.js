import {createSelector} from 'reselect';

const getUsersSelector = state => state.usersPage.users;

export const getUsers = createSelector(getUsersSelector, users => users.filter(() => true));

export const getPageSize = state => state.usersPage.pageSize;

export const getTotalUsersCount = state => state.usersPage.totalUsersCount;

export const getCurrentPage = state => state.usersPage.currentPage;

export const getIsFetching = state => state.usersPage.isFetching;

export const getFollowingInProgress = state => state.usersPage.followingInProgress;
