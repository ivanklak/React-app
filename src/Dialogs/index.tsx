import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Col, List, Row} from 'antd';

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

  const dialogsElements = dialogsPage.dialogs.map(d => <DialogItem data-testid={`DialogItem.User.${d.id}`} dialog={d} key={d.id} />);
  const messagesElements = dialogsPage.messages.map(m => <Message data-testid={`NewMessage.Text.${m.id}`} messages={m} key={m.id} />);

  const addNewMessage = (values: IMessageValues) => {
    dispatch(sendMessages(values.newMessageBody));
  };

  return (
    <Row>
      <Col span={2} className={styles.dialogsColumn}>
        <List className={styles.dialogsList} dataSource={dialogsElements} renderItem={item => <List.Item>{item}</List.Item>} />
      </Col>
      <Col span={12} className={styles.messagesColumn}>
        <div className={styles.messagesTitle}>Timofey</div>
        <div className={styles.messagesContainer}>
          <div className={styles.messageItem}>{messagesElements}</div>
          <div className={styles.messageEnter}>
            <MessageForm addNewMessage={addNewMessage} />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Dialogs;
