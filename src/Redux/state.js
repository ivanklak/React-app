import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';

const ADD_POST = 'ADD_POST';

const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';

const SEND_MESSAGE = 'SEND_MESSAGE';

let store = {
  _state: {
    profilePage: {
      posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'Its my first post', likesCount: 11},
      ],
      newPostText: 'kek.com',
    },
    dialogsPage: {
      messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'Would you like some pizza?'},
        {id: 4, message: 'Yeah'},
        {id: 5, message: 'Yo'},
      ],
      dialogs: [
        {id: 1, name: 'Timofey'},
        {id: 2, name: 'Cat'},
        {id: 3, name: 'Pavel'},
        {id: 4, name: 'Anton'},
        {id: 5, name: 'Gleb'},
        {id: 6, name: 'Tolya'},
      ],
      newMessageBody: '',
    },
    sidebar: {
      friends: [
        {id: 1, name: 'Timofey'},
        {id: 2, name: 'Cat'},
        {id: 3, name: 'Pavel'},
        {id: 4, name: 'Anton'},
        {id: 5, name: 'Gleb'},
        {id: 6, name: 'Tolya'},
      ],
    },
  },
  _callSubscriber() {
    console.log('State changed');
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this._state);
  },
};

export const addPostActionCreator = newPostText => ({type: ADD_POST, newPostText});

export const updateNewPostActionCreator = text => ({type: UPDATE_NEW_POST_TEXT, newText: text});

export const sendMessageCreator = newMessageBody => ({
  type: SEND_MESSAGE,
  newMessageBody,
});

export const updateNewMessageBodyCreator = body => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: body,
});

export default store;
window.store = store;
