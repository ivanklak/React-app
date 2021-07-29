import { usersAPI, profileAPI } from '../api/api';
import { type } from 'os';
import { PostType, ProfileType } from '../types/types';

const ADD_POST = 'ADD_POST';
// const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 12 },
    { id: 2, message: 'Its my first post', likesCount: 11 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
  newPostText: '',
}; // чтобы state был не undefined

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
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
    // case UPDATE_NEW_POST_TEXT: {
    //   return {
    //     ...state,
    //     newPostText: action.newText
    //   };
    // }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter(p => p.id != action.postId),
      };
    }
    //typescript video 4 - SAVE_PHOTO
    default:
      return state;
  }
};

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });

//================================

type SetStatusActionType = {
  type: typeof SET_STATUS;
  status: string;
};
export const setStatus = (status: string): SetStatusActionType => ({
  type: SET_STATUS,
  status,
});

//================================

type AddPostActionCreatorActionType = {
  type: typeof ADD_POST;
  newPostText: string;
};
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => {
  return { type: ADD_POST, newPostText };
};

//================================

type DeletePostActionType = {
  type: typeof DELETE_POST;
  postId: number;
};
export const deletePost = (postId: number): DeletePostActionType => ({
  type: DELETE_POST,
  postId,
});

export const getUserProfile = (userId: number) => {
  return (dispatch: any) => {
    usersAPI.getProfile(userId).then((response: any) => {
      dispatch(setUserProfile(response.data));
    });
  };
};

export const getStatus = (userId: number) => (dispatch: any) => {
  profileAPI.getStatus(userId).then((response: any) => {
    // debugger;
    dispatch(setStatus(response.data));
  });
};
export const updateStatus = (status: string) => (dispatch: any) => {
  profileAPI.updateStatus(status).then((response: any) => {
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  });
};

export default profileReducer;
