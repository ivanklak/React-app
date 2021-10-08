import {ActionsUnion} from '../../App/types';
import {createAction} from '../../App/actions/helpers';
import {IUser} from '../types';

interface IFollowingInProgress {
  isFetching: boolean;
  userId: number;
}

export enum UsersActionTypes {
  TOGGLE_IS_FOLLOWING_PROGRESS = 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
  FOLLOW_SUCCESS = 'USERS/FOLLOW_SUCCESS',
  FOLLOW_FAILURE = 'USERS/FOLLOW_FAILURE',

  UNFOLLOW_SUCCESS = 'USERS/UNFOLLOW_SUCCESS',
  UNFOLLOW_FAILURE = 'USERS/UNFOLLOW_FAILURE',

  GET_USERS_SUCCESS = 'USERS/GET_USERS_SUCCESS',
  GET_USERS_FAILURE = 'USERS/GET_USERS_FAILURE',

  SET_CURRENT_PAGE = 'USERS/SET_CURRENT_PAGE',
  SET_TOTAL_USERS_COUNT = 'USERS/SET_TOTAL_USERS_COUNT',
  TOGGLE_IS_FETCHING = 'USERS/TOGGLE_IS_FETCHING',
}

export const UsersActions = {
  toggleFollowingProgress: (payload: IFollowingInProgress) => createAction(UsersActionTypes.TOGGLE_IS_FOLLOWING_PROGRESS, payload),
  followSuccess: (payload: number) => createAction(UsersActionTypes.FOLLOW_SUCCESS, payload),
  followFailure: (payload: string) => createAction(UsersActionTypes.FOLLOW_FAILURE, payload),

  unfollowSuccess: (payload: number) => createAction(UsersActionTypes.UNFOLLOW_SUCCESS, payload),
  unfollowFailure: (payload: string) => createAction(UsersActionTypes.UNFOLLOW_FAILURE, payload),

  setToggleIsFetching: (payload: boolean) => createAction(UsersActionTypes.TOGGLE_IS_FETCHING, payload),
  getUsersSuccess: (payload: Array<IUser>) => createAction(UsersActionTypes.GET_USERS_SUCCESS, payload),
  getUsersFailure: (payload: string) => createAction(UsersActionTypes.GET_USERS_FAILURE, payload),

  setCurrentPage: (payload: number) => createAction(UsersActionTypes.SET_CURRENT_PAGE, payload),
  setTotalUsersCount: (payload: number) => createAction(UsersActionTypes.SET_TOTAL_USERS_COUNT, payload),
};

export type UsersAction = ActionsUnion<typeof UsersActions>;
