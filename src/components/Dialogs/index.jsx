import React from 'react';
import {Redirect} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {useDispatch, useSelector} from 'react-redux';

import {Textarea} from '../common/FormsControl/FormsControls';
import {required, maxLengthCreator} from '../../utils/validators/validators';
import {sendMessages} from '../../Redux/dialogs-reducer';
import {getAuth} from '../../selectors';

import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import selector from './selector';

import styles from './styles.module.css';

//todo move to another component
const maxLength50 = maxLengthCreator(50);

const AddMessageForm = props => (
  <form onSubmit={props.handleSubmit}>
    <div className={styles.form}>
      <Field component={Textarea} validate={[required, maxLength50]} name="newMessageBody" placeholder="Enter your message" className={styles.messageInput} />
    </div>
    <div>
      <button>Send</button>
    </div>
  </form>
);

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);

const Dialogs = () => {
  const isAuth = useSelector(getAuth);
  const {dialogsPage} = useSelector(selector);
  const dispatch = useDispatch();

  const dialogsElements = dialogsPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
  const messagesElements = dialogsPage.messages.map(m => <Message message={m.message} key={m.id} />);

  const addNewMessage = values => {
    dispatch(sendMessages(values.newMessageBody));
  };

  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>{dialogsElements}</div>
      <div className={styles.messages}>{messagesElements}</div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  );
};

export default Dialogs;
