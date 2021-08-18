import {IThunkResult} from '../../App/types';
import {usersAPI} from '../services';

import {UsersAction, UsersActions} from '../actions';
import {ResultCodes} from '../../App/api';

export const requestUsers =
  (currentPage: number, pageSize: number): IThunkResult<Promise<void>, UsersAction> =>
  async dispatch => {
    dispatch(UsersActions.setToggleIsFetching(true));
    dispatch(UsersActions.setCurrentPage(currentPage));
    const data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(UsersActions.setToggleIsFetching(false));
    dispatch(UsersActions.setUsers(data.items));
    dispatch(UsersActions.setTotalUsersCount(data.totalCount));
  };

export const follow =
  (userId: number): IThunkResult<Promise<void>, UsersAction> =>
  async dispatch => {
    dispatch(UsersActions.toggleFollowingProgress({isFetching: true, userId}));
    const data = await usersAPI.toFollow(userId);

    if (data.resultCode === ResultCodes.Success) {
      dispatch(UsersActions.followSuccess(userId));
    }
    dispatch(UsersActions.toggleFollowingProgress({isFetching: false, userId}));
  };

export const unfollow =
  (userId: number): IThunkResult<Promise<void>, UsersAction> =>
  async dispatch => {
    dispatch(UsersActions.toggleFollowingProgress({isFetching: true, userId}));
    const data = await usersAPI.toUnfollow(userId);

    if (data.resultCode === ResultCodes.Success) {
      dispatch(UsersActions.unfollowSuccess(userId));
    }
    dispatch(UsersActions.toggleFollowingProgress({isFetching: false, userId}));
  };
