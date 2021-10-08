import {IThunkResult} from '../../App/types';
import {usersAPI} from '../services';

import {UsersAction, UsersActions} from '../actions';
import {ResultCodes} from '../../App/services/api';

interface IRequestUsersData {
  currentPage: number;
  pageSize: number;
}

export const requestUsers =
  (requestUsersData: IRequestUsersData): IThunkResult<Promise<void>, UsersAction> =>
  async dispatch => {
    dispatch(UsersActions.setToggleIsFetching(true));
    try {
      dispatch(UsersActions.setCurrentPage(requestUsersData.currentPage));
      const data = await usersAPI.getUsers(requestUsersData);

      dispatch(UsersActions.setToggleIsFetching(false));
      dispatch(UsersActions.getUsersSuccess(data.items));
      dispatch(UsersActions.setTotalUsersCount(data.totalCount));
    } catch (error) {
      const result = (error as Error).message;

      dispatch(UsersActions.getUsersFailure(result));
    }
  };

export const follow =
  (userId: number): IThunkResult<Promise<void>, UsersAction> =>
  async dispatch => {
    dispatch(UsersActions.toggleFollowingProgress({isFetching: true, userId}));
    try {
      const data = await usersAPI.toFollow(userId);

      if (data.resultCode === ResultCodes.Success) {
        dispatch(UsersActions.followSuccess(userId));
      }
      dispatch(UsersActions.toggleFollowingProgress({isFetching: false, userId}));
    } catch (error) {
      const result = (error as Error).message;

      dispatch(UsersActions.followFailure(result));
    }
  };

export const unfollow =
  (userId: number): IThunkResult<Promise<void>, UsersAction> =>
  async dispatch => {
    dispatch(UsersActions.toggleFollowingProgress({isFetching: true, userId}));
    try {
      const data = await usersAPI.toUnfollow(userId);

      if (data.resultCode === ResultCodes.Success) {
        dispatch(UsersActions.unfollowSuccess(userId));
      }
      dispatch(UsersActions.toggleFollowingProgress({isFetching: false, userId}));
    } catch (error) {
      const result = (error as Error).message;

      dispatch(UsersActions.unfollowFailure(result));
    }
  };
