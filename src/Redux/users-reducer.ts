import {ThunkAction} from 'redux-thunk';

import {ResultCodeEnum, usersAPI} from '../api';
import {UserType} from '../types/types';

import {AppStateType} from './redux-store';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 100,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>,
};

type InitialState = typeof initialState;

const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return {...u, followed: true};
          }

          return u;
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return {...u, followed: false};
          }

          return u;
        }),
      };

    case SET_USERS: {
      return {...state, users: action.users};
    }

    case SET_CURRENT_PAGE: {
      return {...state, currentPage: action.currentPage};
    }

    case SET_TOTAL_USERS_COUNT: {
      return {...state, totalUsersCount: action.count};
    }

    case TOGGLE_IS_FETCHING: {
      return {...state, isFetching: action.isFetching};
    }

    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId] : state.followingInProgress.filter(id => id != action.userId),
      };
    }

    default:
      return state;
  }
};

type ActionsTypes =
  | FollowSuccessType
  | UnfollowSuccessType
  | SetUsersType
  | SetCurrentPageType
  | SetTotalUsersCountType
  | SetTougleIsFetchingType
  | ToggleFollowingProgressType;

type FollowSuccessType = {
  type: typeof FOLLOW;
  userId: number;
};

export const followSuccess = (userId: number): FollowSuccessType => ({
  type: FOLLOW,
  userId,
});

type UnfollowSuccessType = {
  type: typeof UNFOLLOW;
  userId: number;
};

export const unfollowSuccess = (userId: number): UnfollowSuccessType => ({
  type: UNFOLLOW,
  userId,
});

type SetUsersType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};

export const setUsers = (users: Array<UserType>): SetUsersType => ({
  type: SET_USERS,
  users,
});

type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};

export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

type SetTotalUsersCountType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  count: number;
};

export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount,
});

type SetTougleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};

export const setTougleIsFetching = (isFetching: boolean): SetTougleIsFetchingType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

type ToggleFollowingProgressType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};

export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const requestUsers =
  (currentPage: number, pageSize: number): ThunkType =>
  async dispatch => {
    dispatch(setTougleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    const data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(setTougleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };

export const follow =
  (userId: number): ThunkType =>
  async dispatch => {
    dispatch(toggleFollowingProgress(true, userId));
    const data = await usersAPI.toFollow(userId);

    if (data.resultCode === ResultCodeEnum.Succes) {
      dispatch(followSuccess(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
  };

export const unfollow =
  (userId: number): ThunkType =>
  async dispatch => {
    dispatch(toggleFollowingProgress(true, userId));
    const data = await usersAPI.toUnfollow(userId);

    if (data.resultCode === ResultCodeEnum.Succes) {
      dispatch(unfollowSuccess(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
  };

export default usersReducer;
