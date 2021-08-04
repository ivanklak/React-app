import React from 'react';
import {Redirect} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';

import {Textarea} from '../common/FormsControl/FormsControls';
import {required, maxLengthCreator} from '../../utils/validators/validators';

import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

import s from './Dialogs.module.css';

const Dialogs = props => {
  const state = props.dialogsPage;

  const dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
  const messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} />);

  const addNewMessage = values => {
    props.sendMessage(values.newMessageBody);
  };

  if (!props.isAuth) {
    return <Redirect to={'/login'} />;
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  );
};

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = props => (
  <form onSubmit={props.handleSubmit}>
    <div className={s.form}>
      <Field component={Textarea} validate={[required, maxLength50]} name="newMessageBody" placeholder="Enter your message" className={s.messageInput} />
    </div>
    <div>
      <button>Send</button>
    </div>
  </form>
);

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);

export default Dialogs;
