import {ThunkAction} from 'redux-thunk';

import {ResultCodes, usersAPI} from '../../api';
import {IUser} from '../../types/types';
import {AppStateType} from '../redux-store';

import {UsersActionTypes, UsersActions, UsersAction} from './actions';

interface IState {
  users: Array<IUser>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<number>;
}

const initialState: IState = {
  users: [],
  pageSize: 100,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action: UsersAction): IState => {
  switch (action.type) {
    case UsersActionTypes.FOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.payload) {
            return {...u, followed: true};
          }

          return u;
        }),
      };

    case UsersActionTypes.UNFOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.payload) {
            return {...u, followed: false};
          }

          return u;
        }),
      };

    case UsersActionTypes.SET_USERS: {
      return {...state, users: action.payload};
    }

    case UsersActionTypes.SET_CURRENT_PAGE: {
      return {...state, currentPage: action.payload};
    }

    case UsersActionTypes.SET_TOTAL_USERS_COUNT: {
      return {...state, totalUsersCount: action.payload};
    }

    case UsersActionTypes.TOGGLE_IS_FETCHING: {
      return {...state, isFetching: action.payload};
    }

    case UsersActionTypes.TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.payload.isFetching
          ? [...state.followingInProgress, action.payload.userId]
          : state.followingInProgress.filter(id => id != action.payload.userId),
      };
    }

    default:
      return state;
  }
};

type IThunk = ThunkAction<Promise<void>, AppStateType, unknown, UsersAction>;

export const requestUsers =
  (currentPage: number, pageSize: number): IThunk =>
  async dispatch => {
    dispatch(UsersActions.setToggleIsFetching(true));
    dispatch(UsersActions.setCurrentPage(currentPage));
    const data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(UsersActions.setToggleIsFetching(false));
    dispatch(UsersActions.setUsers(data.items));
    dispatch(UsersActions.setTotalUsersCount(data.totalCount));
  };

export const follow =
  (userId: number): IThunk =>
  async dispatch => {
    dispatch(UsersActions.toggleFollowingProgress({isFetching: true, userId: userId}));
    const data = await usersAPI.toFollow(userId);

    if (data.resultCode === ResultCodes.Success) {
      dispatch(UsersActions.followSuccess(userId));
    }
    dispatch(UsersActions.toggleFollowingProgress({isFetching: false, userId: userId}));
  };

export const unfollow =
  (userId: number): IThunk =>
  async dispatch => {
    dispatch(UsersActions.toggleFollowingProgress({isFetching: true, userId: userId}));
    const data = await usersAPI.toUnfollow(userId);

    if (data.resultCode === ResultCodes.Success) {
      dispatch(UsersActions.unfollowSuccess(userId));
    }
    dispatch(UsersActions.toggleFollowingProgress({isFetching: false, userId: userId}));
  };

export default usersReducer;
