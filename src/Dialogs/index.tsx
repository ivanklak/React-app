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

  const dialogsElements = dialogsPage.dialogs.map(d => <DialogItem dialog={d} key={d.id} />);
  const messagesElements = dialogsPage.messages.map(m => <Message messages={m} key={m.id} />);

  const addNewMessage = (values: IMessageValues) => {
    dispatch(sendMessages(values.newMessageBody));
  };

  return (
    <Row gutter={16}>
      <Col span={2} style={{backgroundColor: '#ffffff'}}>
        <List className={styles.list} dataSource={dialogsElements} renderItem={item => <List.Item>{item}</List.Item>} />
      </Col>
      <Col span={12} style={{backgroundColor: '#ffffff'}}>
        <div className={styles.messages_title}>Timofey</div>
        <div className={styles.messages_container}>
          <div className={styles.message_item}>{messagesElements}</div>
          <div className={styles.message_enter}>
            <MessageForm addNewMessage={addNewMessage} />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Dialogs;
