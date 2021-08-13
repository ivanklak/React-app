import {ThunkAction} from 'redux-thunk';

import {profileAPI, ResultCodes} from '../../api';
import {PostType, ProfileType} from '../../types/types';

import {AppStateType} from '../redux-store';

import * as fromActions from './actions';

export interface IState {
  posts: Array<PostType>;
  profile: ProfileType | null;
  status: string;
  newPostText: string;
}

const initialState: IState = {
  posts: [
    {id: 1, message: 'Hi, how are you?', likesCount: 12},
    {id: 2, message: 'Its my first post', likesCount: 11},
  ],
  profile: null,
  status: '',
  newPostText: '',
};

const profileReducer = (state = initialState, action: fromActions.Actions): IState => {
  switch (action.type) {
    case fromActions.ActionTypes.ADD_POST: {
      const newPost = {
        id: 5,
        message: action.payload,
        likesCount: 0,
      };

      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: '',
      };
    }
    case fromActions.ActionTypes.SET_STATUS: {
      return {
        ...state,
        status: action.payload,
      };
    }
    case fromActions.ActionTypes.SET_USER_PROFILE: {
      return {...state, profile: action.payload};
    }
    case fromActions.ActionTypes.DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter(p => p.id != action.payload),
      };
    }
    default:
      return state;
  }
};

type IThunk = ThunkAction<Promise<void>, AppStateType, unknown, fromActions.Actions>;

export const getUserProfile =
  (userId: number): IThunk =>
  async dispatch => {
    const response = await profileAPI.getProfile(userId);

    dispatch(fromActions.Actions.setUserProfile(response));
  };

export const getStatus =
  (userId: number): IThunk =>
  async dispatch => {
    const response = await profileAPI.getStatus(userId);

    dispatch(fromActions.Actions.setStatus(response));
  };

export const updateStatus =
  (status: string): IThunk =>
  async dispatch => {
    const response = await profileAPI.updateStatus(status);

    if (response.resultCode === ResultCodes.Success) {
      dispatch(fromActions.Actions.setStatus(status));
    }
  };

type IThunkPost = ThunkAction<void, AppStateType, unknown, fromActions.Actions>;

export const addNewPost =
  (newPostText: string): IThunkPost =>
  dispatch => {
    dispatch(fromActions.Actions.addPost(newPostText));
  };

export default profileReducer;
