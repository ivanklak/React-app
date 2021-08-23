import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Card, List} from 'antd';

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
    <div>
      <div className={styles.dialogs}>
        <List bordered dataSource={dialogsElements} renderItem={item => <List.Item>{item}</List.Item>} />
        <div className={styles.messages}>
          <Card style={{width: 600, height: '100%'}}>
            <div className={styles.message_item}>{messagesElements}</div>
            <div className={styles.message_enter}>
              <MessageForm addNewMessage={addNewMessage} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
