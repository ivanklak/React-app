import React from "react";
import { sendMessageCreator, newMessageBodyCreator } from "../../Redux/state";
import Dialogs from "./Dialogs";

const DialogsContainer = props => {
  let state = props.store.getState().dialogsPage;

  let onSendMessageClick = () => {
    props.store.dispatch(sendMessageCreator());
  };

  let onNewMessageChange = body => {
    props.store.dispatch(newMessageBodyCreator(body));
  };

  return (
    <Dialogs
      newMessageBody={onNewMessageChange}
      sendMessage={onSendMessageClick}
      dialogsPage={state}
    />
  );
};

export default DialogsContainer;
