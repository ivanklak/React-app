import {IUser} from '../types';

import {UsersAction, UsersActionTypes} from '../actions';

export interface IUsersState {
  users: Array<IUser>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<number>;
}

const initialState: IUsersState = {
  users: [],
  pageSize: 100,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action: UsersAction): IUsersState => {
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
          : state.followingInProgress.filter(id => id !== action.payload.userId),
      };
    }

    default:
      return state;
  }
};

export default usersReducer;
