import {ThunkAction} from 'redux-thunk';

import {ResultCodes, usersAPI} from '../../api';
import {UserType} from '../../types/types';
import {AppStateType} from '../redux-store';

import * as fromActions from './actions';

interface IState {
  users: Array<UserType>;
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

const usersReducer = (state = initialState, action: fromActions.Actions): IState => {
  switch (action.type) {
    case fromActions.ActionTypes.FOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.payload) {
            return {...u, followed: true};
          }

          return u;
        }),
      };

    case fromActions.ActionTypes.UNFOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.payload) {
            return {...u, followed: false};
          }

          return u;
        }),
      };

    case fromActions.ActionTypes.SET_USERS: {
      return {...state, users: action.payload};
    }

    case fromActions.ActionTypes.SET_CURRENT_PAGE: {
      return {...state, currentPage: action.payload};
    }

    case fromActions.ActionTypes.SET_TOTAL_USERS_COUNT: {
      return {...state, totalUsersCount: action.payload};
    }

    case fromActions.ActionTypes.TOGGLE_IS_FETCHING: {
      return {...state, isFetching: action.payload};
    }

    case fromActions.ActionTypes.TOGGLE_IS_FOLLOWING_PROGRESS: {
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

type IThunk = ThunkAction<Promise<void>, AppStateType, unknown, fromActions.Actions>;

export const requestUsers =
  (currentPage: number, pageSize: number): IThunk =>
  async dispatch => {
    dispatch(fromActions.Actions.setToggleIsFetching(true));
    dispatch(fromActions.Actions.setCurrentPage(currentPage));
    const data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(fromActions.Actions.setToggleIsFetching(false));
    dispatch(fromActions.Actions.setUsers(data.items));
    dispatch(fromActions.Actions.setTotalUsersCount(data.totalCount));
  };

export const follow =
  (userId: number): IThunk =>
  async dispatch => {
    dispatch(fromActions.Actions.toggleFollowingProgress(true, userId));
    const data = await usersAPI.toFollow(userId);

    if (data.resultCode === ResultCodes.Success) {
      dispatch(fromActions.Actions.followSuccess(userId));
    }
    dispatch(fromActions.Actions.toggleFollowingProgress(false, userId));
  };

export const unfollow =
  (userId: number): IThunk =>
  async dispatch => {
    dispatch(fromActions.Actions.toggleFollowingProgress(true, userId));
    const data = await usersAPI.toUnfollow(userId);

    if (data.resultCode === ResultCodes.Success) {
      dispatch(fromActions.Actions.unfollowSuccess(userId));
    }
    dispatch(fromActions.Actions.toggleFollowingProgress(false, userId));
  };

export default usersReducer;
