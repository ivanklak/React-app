import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer"; 
const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";

const UPDATE_NEW_MESSAGE_BODY = "UPDATE_NEW_MESSAGE_BODY";
const SEND_MESSAGE = "SEND_MESSAGE";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi, how are you?", likesCount: 12 },
        { id: 2, message: "Its my first post", likesCount: 11 }
      ],
      newPostText: "kek.com"
    },
    dialogsPage: { 
      messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How are you?" },
        { id: 3, message: "Would you like some pizza?" },
        { id: 4, message: "Yeeeaah" },
        { id: 5, message: "Yo" }
      ],
      dialogs: [
        { id: 1, name: "Timofey" },
        { id: 2, name: "Cat" },
        { id: 3, name: "Pavel" },
        { id: 4, name: "Anton" },
        { id: 5, name: "Gleb" },
        { id: 6, name: "Tolya" }
      ],
      newMessageBody: ""
    },
    sidebar: {
      friends: [
        { id: 1, name: "Timofey" },
        { id: 2, name: "Cat" },
        { id: 3, name: "Pavel" },
        { id: 4, name: "Anton" },
        { id: 5, name: "Gleb" },
        { id: 6, name: "Tolya" }
      ]
    }
  },
  _callSubscriber() {
    console.log("State changed");
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer; //наблюдатель
  },

  dispatch(action) {
    // {type: "ADD-POST"}

    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);
    
    this._callSubscriber(this._state);
  }
};

export const addPostActionCreator = () => {
  return { type: ADD_POST };
};

export const updateNewPostActionCreator = text => {
  return { type: UPDATE_NEW_POST_TEXT, newText: text };
};

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const newMessageBodyCreator = body => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: body
});

export default store;
window.store = store;

//store - OOP
//видео 40: action - обьект у кот как миниимум есть type, его мы можем диспачить в store
//видео 41: reducer (преобразователь)- функция, кот принимает state и action, применяет action к state (если надо), возвращает new state
