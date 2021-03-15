import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = "ADD_POST";
// const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "Its my first post", likesCount: 11 }
  ],
  profile: null,
  status: ""
}; // чтобы state был не undefined

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: ""
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
        status: action.status
      };
    }
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter(p => p.id != action.postId)
      };
    }
    default:
      return state;
  }
};

export const setUserProfile = profile => ({ type: SET_USER_PROFILE, profile });
export const setStatus = status => ({ type: SET_STATUS, status });
export const addPostActionCreator = newPostText => {
  return { type: ADD_POST, newPostText };
};
export const deletePost = postId => ({ type: DELETE_POST, postId });

export const getUserProfile = userId => {
  return dispatch => {
    usersAPI.getProfile(userId).then(response => {
      dispatch(setUserProfile(response.data));
    });
  };
};

export const getStatus = userId => dispatch => {
  profileAPI.getStatus(userId).then(response => {
    // debugger;
    dispatch(setStatus(response.data));
  });
};
export const updateStatus = status => dispatch => {
  profileAPI.updateStatus(status).then(response => {
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  });
};

export default profileReducer;
