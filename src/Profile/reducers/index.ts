import {IPost, IProfile} from '../types';

import {ProfileAction, ProfileActionTypes} from '../actions';

interface IProfileState {
  posts: Array<IPost>;
  profile: IProfile | null;
  status: string;
  newPostText: string;
}

const initialState: IProfileState = {
  posts: [
    {id: 1, message: 'Hi, how are you?', likesCount: 12},
    {id: 2, message: 'Its my first post', likesCount: 11},
  ],
  profile: null,
  status: '',
  newPostText: '',
};

const profileReducer = (state = initialState, action: ProfileAction): IProfileState => {
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
        posts: state.posts.filter(p => p.id !== action.payload),
      };
    }
    default:
      return state;
  }
};

export default profileReducer;
