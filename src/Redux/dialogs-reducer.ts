const SEND_MESSAGE = "SEND_MESSAGE";

type DialogType = {
  id: number;
  name: string;
};

type MessageType = {
  id: number;
  message: string;
};

let initialState = {
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How are you?" },
    { id: 3, message: "Would you like some pizza?" },
    { id: 4, message: "Yeeeaah" },
    { id: 5, message: "Yo" },
  ] as Array<MessageType>,
  dialogs: [
    { id: 1, name: "Timofey" },
    { id: 2, name: "Cat" },
    { id: 3, name: "Pavel" },
    { id: 4, name: "Anton" },
    { id: 5, name: "Gleb" },
    { id: 6, name: "Tolya" },
  ] as Array<DialogType>,
};

export type InitialStateType = typeof initialState;

const dialogsReducer = (
  state = initialState,
  action: any
): InitialStateType => {
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
        messages: [...state.messages, { id: 6, message: body }],
      };
    default:
      return state;
  }
};

type SendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE;
  newMessageBody: string;
};

export const sendMessageCreator = (
  newMessageBody: any
): SendMessageCreatorActionType => ({
  type: SEND_MESSAGE,
  newMessageBody,
});
// export const updateNewMessageBodyCreator = body => ({
//   type: UPDATE_NEW_MESSAGE_BODY,
//   body: body
// });

export default dialogsReducer;
