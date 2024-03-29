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

export const initialState: IProfileState = {
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

const profileReducer = (state = initialState, action: ProfileAction): IProfileState => {
  switch (action.type) {
    case ProfileActionTypes.ADD_POST: {
      const newPost = {
        id: state.posts.length + 1,
        message: action.payload,
        likesCount: 0,
      };

      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: '',
      };
    }
    case ProfileActionTypes.GET_STATUS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ProfileActionTypes.GET_STATUS_SUCCESS: {
      return {
        ...state,
        status: action.payload,
        isLoading: false,
      };
    }
    case ProfileActionTypes.GET_STATUS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case ProfileActionTypes.GET_USER_PROFILE_REQUEST: {
      return {
        ...state,
        isLoading: true,
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
