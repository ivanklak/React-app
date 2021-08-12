import React, {FC} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {sendMessages} from '../../Redux/dialogs-reducer';
import {getAuth} from '../../selectors';

import DialogItem from './DialogItem';
import Message from './Message';
import selector from './selector';
import MessageForm from './MessageForm';

import styles from './styles.module.css';

const Dialogs: FC = () => {
  const isAuth = useSelector(getAuth);
  const {dialogsPage} = useSelector(selector);
  const dispatch = useDispatch();

  const dialogsElements = dialogsPage.dialogs.map((d: any) => <DialogItem name={d.name} key={d.id} id={d.id} />);
  const messagesElements = dialogsPage.messages.map((m: any) => <Message message={m.message} key={m.id} />);

  const addNewMessage = (values: any) => {
    dispatch(sendMessages(values.newMessageBody));
  };

  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>{dialogsElements}</div>
      <div className={styles.messages}>{messagesElements}</div>
      <MessageForm onSubmit={addNewMessage} />
    </div>
  );
};

export default Dialogs;
