import {IPost, IProfile} from '../types';

import {ProfileAction, ProfileActionTypes} from '../actions';

export interface IProfileState {
  posts: Array<IPost>;
  profile: IProfile | null;
  status: string;
  newPostText: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: IProfileState = {
  posts: [
    {id: 1, message: 'Hi, how are you?', likesCount: 12},
    {id: 2, message: 'Its my first post', likesCount: 11},
  ],
  profile: null,
  status: '',
  newPostText: '',
  isLoading: false,
  error: null,
};

export const profileReducer = (state = initialState, action: ProfileAction): IProfileState => {
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
    case ProfileActionTypes.SET_STATUS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ProfileActionTypes.SET_STATUS_SUCCESS: {
      return {
        ...state,
        status: action.payload,
        isLoading: false,
      };
    }
    case ProfileActionTypes.SET_STATUS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case ProfileActionTypes.GET_USER_PROFILE_REQUEST: {
      return {
        ...state,
        profile: null,
        isLoading: true,
        error: null,
      };
    }
    case ProfileActionTypes.GET_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
      };
    }
    case ProfileActionTypes.GET_USER_PROFILE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case ProfileActionTypes.DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.payload),
      };
    }
    default:
      return state;
  }
};

export default profileReducer;
