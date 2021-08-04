import {ThunkAction} from 'redux-thunk';

import {usersAPI, profileAPI} from '../api/api';
import {PostType, ProfileType} from '../types/types';

import {AppStateType} from './redux-store';

const ADD_POST = 'ADD_POST';

const SET_USER_PROFILE = 'SET_USER_PROFILE';

const SET_STATUS = 'SET_STATUS';

const DELETE_POST = 'DELETE_POST';

const initialState = {
  posts: [
    {id: 1, message: 'Hi, how are you?', likesCount: 12},
    {id: 2, message: 'Its my first post', likesCount: 11},
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
  newPostText: '',
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      const newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };

      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: '',
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case SET_USER_PROFILE: {
      return {...state, profile: action.profile};
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter(p => p.id != action.postId),
      };
    }
    default:
      return state;
  }
};

type ActionsTypes = SetUserProfileActionType | SetStatusActionType | AddPostActionCreatorActionType | DeletePostActionType;

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});

type SetStatusActionType = {
  type: typeof SET_STATUS;
  status: string;
};

export const setStatus = (status: string): SetStatusActionType => ({
  type: SET_STATUS,
  status,
});

type AddPostActionCreatorActionType = {
  type: typeof ADD_POST;
  newPostText: string;
};

export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({type: ADD_POST, newPostText});

type DeletePostActionType = {
  type: typeof DELETE_POST;
  postId: number;
};

export const deletePost = (postId: number): DeletePostActionType => ({
  type: DELETE_POST,
  postId,
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const getUserProfile = (userId: number): ThunkType => async dispatch => {
    const response = await usersAPI.getProfile(userId);

    dispatch(setUserProfile(response.data));
  };

export const getStatus =
  (userId: number): ThunkType =>
  async dispatch => {
    const response = await profileAPI.getStatus(userId);

    dispatch(setStatus(response.data));
  };

export const updateStatus =
  (status: string): ThunkType =>
  async dispatch => {
    const response = await profileAPI.updateStatus(status);

    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  };

export default profileReducer;
