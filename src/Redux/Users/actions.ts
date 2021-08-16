import {ActionsUnion, UserType} from '../../types/types';

import {createAction} from '../action-helper';

export enum ActionTypes {
  FOLLOW = 'users/FOLLOW',
  UNFOLLOW = 'users/UNFOLLOW',
  SET_USERS = 'users/SET_USERS',
  SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE',
  SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT',
  TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING',
  TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS',
}

export const Actions = {
  followSuccess: (userId: number) => createAction(ActionTypes.FOLLOW, userId),
  unfollowSuccess: (userId: number) => createAction(ActionTypes.UNFOLLOW, userId),
  setUsers: (users: Array<UserType>) => createAction(ActionTypes.SET_USERS, users),
  setCurrentPage: (currentPage: number) => createAction(ActionTypes.SET_CURRENT_PAGE, currentPage),
  setTotalUsersCount: (totalUsersCount: number) => createAction(ActionTypes.SET_TOTAL_USERS_COUNT, totalUsersCount),
  setToggleIsFetching: (isFetching: boolean) => createAction(ActionTypes.TOGGLE_IS_FETCHING, isFetching),
  toggleFollowingProgress: (isFetching: boolean, userId: number) =>
    createAction(ActionTypes.TOGGLE_IS_FOLLOWING_PROGRESS, {
      isFetching,
      userId,
    }),
};

export type Actions = ActionsUnion<typeof Actions>;
