import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {sendMessages} from './thunks';
import {IMessageValues} from './types';

import DialogItem from './components/DialogItem';
import Message from './components/Message';
import selector from './selectors';
import MessageForm from './components/MessageForm';

import styles from './styles.module.css';

const Dialogs: FC = () => {
  const {dialogsPage} = useSelector(selector);
  const dispatch = useDispatch();

  const dialogsElements = dialogsPage.dialogs.map(d => <DialogItem dialog={d} key={d.id} />);
  const messagesElements = dialogsPage.messages.map(m => <Message messages={m} key={m.id} />);

  const addNewMessage = (values: IMessageValues) => {
    dispatch(sendMessages(values.newMessageBody));
  };

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>{dialogsElements}</div>
      <div className={styles.messages}>{messagesElements}</div>
      <MessageForm onSubmit={addNewMessage} />
    </div>
  );
};

export default Dialogs;
