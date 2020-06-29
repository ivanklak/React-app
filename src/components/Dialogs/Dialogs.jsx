import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { sendMessageCreator, newMessageBodyCreator } from "./../../Redux/state";

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

  let onSendMessageClick = () => {
    props.sendMessage();
    // let text = newMessageElement.current.value;
    // alert(text);
  };

  let onNewMessageChange = e => {
    let body = e.target.value;
    props.updateNewMessageBody(body);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
      <div>
        <textarea
          // ref={newMessageElement}
          value={newMessageBody}
          onChange={onNewMessageChange}
          placeholder="Enter your message"
        ></textarea>
      </div>
      <div>
        <button onClick={onSendMessageClick}>Send</button>
      </div>
    </div>
  );
};

export default Dialogs;
