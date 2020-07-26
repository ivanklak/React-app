import React from "react";
import { sendMessageCreator, updateNewMessageBodyCreator } from "../../Redux/state";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";

let mapStateToProps = state => {
  return {
    dialogsPage: state.dialogsPage, //перерисовка
    isAuth: state.auth.isAuth
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    //callback -и
    sendMessage: () => {
      dispatch(sendMessageCreator());
    },
    updateNewMessageBody: (body) => {
      dispatch(updateNewMessageBodyCreator(body));
    }
  };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
