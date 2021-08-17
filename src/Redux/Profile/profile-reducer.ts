import {profileAPI, ResultCodes} from '../../api';
import {IPost, IProfile, IThunkResult} from '../../types/types';

import {ProfileAction, ProfileActions, ProfileActionTypes} from './actions';

interface IState {
  posts: Array<IPost>;
  profile: IProfile | null;
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

const profileReducer = (state = initialState, action: ProfileAction): IState => {
  switch (action.type) {
    case ProfileActionTypes.ADD_POST: {
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
    case ProfileActionTypes.SET_STATUS: {
      return {
        ...state,
        status: action.payload,
      };
    }
    case ProfileActionTypes.SET_USER_PROFILE: {
      return {...state, profile: action.payload};
    }
    case ProfileActionTypes.DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter(p => p.id != action.payload),
      };
    }
    default:
      return state;
  }
};

export const getUserProfile =
  (userId: number): IThunkResult<Promise<void>, ProfileAction> =>
  async dispatch => {
    const response = await profileAPI.getProfile(userId);

    dispatch(ProfileActions.setUserProfile(response));
  };

export const getStatus =
  (userId: number): IThunkResult<Promise<void>, ProfileAction> =>
  async dispatch => {
    const response = await profileAPI.getStatus(userId);

    dispatch(ProfileActions.setStatus(response));
  };

export const updateStatus =
  (status: string): IThunkResult<Promise<void>, ProfileAction> =>
  async dispatch => {
    const response = await profileAPI.updateStatus(status);

    if (response.resultCode === ResultCodes.Success) {
      dispatch(ProfileActions.setStatus(status));
    }
  };

export const addNewPost =
  (newPostText: string): IThunkResult<void, ProfileAction> =>
  dispatch => {
    dispatch(ProfileActions.addPost(newPostText));
  };

export default profileReducer;
