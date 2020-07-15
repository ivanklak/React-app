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

  // const input = document.querySelector(".message-input");

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
      <div>
        {/* <textarea
          // ref={newMessageElement}
          value={newMessageBody}
          onChange={onNewMessageChange}
          placeholder="Enter your message"
        ></textarea> */}
        <form className={s.form}>
          <input className={s.messageInput} type="message" placeholder="Enter your message" value={newMessageBody}
          onChange={onNewMessageChange}  />
          {/* <button class="send-button" type="submit" onClick={onSendMessageClick}>
            <i class="far fa-envelope send-envelope"></i>
            Send
          </button> */}
        </form>
        <i class="far fa-envelope hidden-envelope"></i>
      </div>
      <div>
        <button className={s.sendButton} onClick={onSendMessageClick}>Send</button>
      </div>
    </div>
  );
};

export default Dialogs;
