// const UPDATE_NEW_MESSAGE_BODY = "UPDATE_NEW_MESSAGE_BODY";
const SEND_MESSAGE = "SEND_MESSAGE";

let initialState = {
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
  ]
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case UPDATE_NEW_MESSAGE_BODY:
    //   return {
    //     //делаем копию
    //     ...state,
    //     newMessageBody: action.body
    //   };

    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: body }]
      };
    default:
      return state;
  }
};

export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody });
// export const updateNewMessageBodyCreator = body => ({
//   type: UPDATE_NEW_MESSAGE_BODY,
//   body: body
// });

export default dialogsReducer;
