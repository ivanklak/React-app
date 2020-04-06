import React from "react";
import { sendMessageCreator, newMessageBodyCreator } from "../../Redux/state";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";

let mapStateToProps = state => {
  return {
    dialogsPage: state.dialogsPage
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    //callback -и
    newMessageBody: () => {
      dispatch(sendMessageCreator());
    },
    sendMessage: (body) => {
      dispatch(newMessageBodyCreator(body));
    }
  };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
