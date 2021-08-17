import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {sendMessages} from '../../Redux/Dialogs/dialogs-reducer';
import {IMessageValues} from '../../types/types';

import DialogItem from './DialogItem';
import Message from './Message';
import selector from './selector';
import MessageForm from './MessageForm';

import styles from './styles.module.css';

const Dialogs: FC = () => {
  const {dialogsPage} = useSelector(selector);
  const dispatch = useDispatch();

  const dialogsElements = dialogsPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
  const messagesElements = dialogsPage.messages.map(m => <Message message={m.message} key={m.id} />);

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
