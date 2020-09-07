import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { sendMessageCreator, newMessageBodyCreator } from "./../../Redux/state";
import { Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

const Dialogs = props => {
  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map(d => (
    <DialogItem name={d.name} key={d.id} id={d.id} />
  ));
  let messagesElements = state.messages.map(m => (
    <Message message={m.message} key={m.id} />
  ));
  let newMessageBody = state.newMessageBody;

  //let newMessageElement = React.createRef();

  //удалили так как это все делает redux-form
  // let onSendMessageClick = () => {
  //   props.sendMessage();
  //   // let text = newMessageElement.current.value;
  //   // alert(text);
  // };

  // let onNewMessageChange = e => {
  //   let body = e.target.value;
  //   props.updateNewMessageBody(body);
  // };

  let addNewMessage = values => {
    props.sendMessage(values.newMessageBody);
  };

  if (!props.isAuth) return <Redirect to={"/login"} />;

  // const input = document.querySelector(".message-input");

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  );
};

const AddMessageForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={s.form}>
        <Field
          component="input"
          name="newMessageBody"
          placeholder="Enter your message"
          className={s.messageInput}
          type="message"
        />
      </div>
      {/* <i class="far fa-envelope hidden-envelope"></i> */}
      <div>
        <button>Send</button>
        {/* className={s.sendButton} */}
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm({ form: "dialogAddMessageForm" })(
  AddMessageForm
);

export default Dialogs;
