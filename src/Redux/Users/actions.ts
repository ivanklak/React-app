import {ActionsUnion, IUser} from '../../types/types';

import {createAction} from '../action-helper';

interface IFollowingInProgress {
  isFetching: boolean;
  userId: number;
}

export enum UsersActionTypes {
  FOLLOW = 'USERS/FOLLOW',
  UNFOLLOW = 'USERS/UNFOLLOW',
  SET_USERS = 'USERS/SET_USERS',
  SET_CURRENT_PAGE = 'USERS/SET_CURRENT_PAGE',
  SET_TOTAL_USERS_COUNT = 'USERS/SET_TOTAL_USERS_COUNT',
  TOGGLE_IS_FETCHING = 'USERS/TOGGLE_IS_FETCHING',
  TOGGLE_IS_FOLLOWING_PROGRESS = 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
}

export const UsersActions = {
  followSuccess: (payload: number) => createAction(UsersActionTypes.FOLLOW, payload),
  unfollowSuccess: (payload: number) => createAction(UsersActionTypes.UNFOLLOW, payload),
  setUsers: (payload: Array<IUser>) => createAction(UsersActionTypes.SET_USERS, payload),
  setCurrentPage: (payload: number) => createAction(UsersActionTypes.SET_CURRENT_PAGE, payload),
  setTotalUsersCount: (payload: number) => createAction(UsersActionTypes.SET_TOTAL_USERS_COUNT, payload),
  setToggleIsFetching: (payload: boolean) => createAction(UsersActionTypes.TOGGLE_IS_FETCHING, payload),
  toggleFollowingProgress: (payload: IFollowingInProgress) => createAction(UsersActionTypes.TOGGLE_IS_FOLLOWING_PROGRESS, payload),
};

export type UsersAction = ActionsUnion<typeof UsersActions>;
