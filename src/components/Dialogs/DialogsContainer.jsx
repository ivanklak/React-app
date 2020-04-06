import React from "react";
import { sendMessageCreator, newMessageBodyCreator } from "../../Redux/state";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";

const DialogsContainer = () => {
  return (
    <StoreContext.Consumer>
      {store => {
        let state = store.getState().dialogsPage;

        let onSendMessageClick = () => {
          store.dispatch(sendMessageCreator());
        };

        let onNewMessageChange = body => {
          store.dispatch(newMessageBodyCreator(body));
        };

        return (
          <Dialogs
            newMessageBody={onNewMessageChange}
            sendMessage={onSendMessageClick}
            dialogsPage={state}
          />
        );
      }}
    </StoreContext.Consumer>
  );
};

let mapStateToProps = state => {
  return {
    dialogsPage: state.dialogsPage
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    newMessageBody: () => {
      dispatch(sendMessageCreator());
    },
    sendMessage: (body) => {
      dispatch(newMessageBodyCreator(body));
    }
  };
};

const SuperDialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
