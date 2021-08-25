import React, {FC} from 'react';
import {Button, Form, Input} from 'antd';

import {IMessageValues} from '../../types';

import 'antd/dist/antd.css';
import styles from './styles.module.css';

interface IPostProps {
  addNewMessage: (values: IMessageValues) => void;
}

const MessageForm: FC<IPostProps> = ({addNewMessage}) => (
  <Form layout="inline" name="basic" initialValues={{remember: true}} onFinish={addNewMessage}>
    <Form.Item name="newMessageBody" rules={[{required: true, message: 'Please input your message'}]}>
      <Input className={styles.messageEnter} data-testid="NewMessage.Enter" />
    </Form.Item>
    <Form.Item style={{marginRight: 0}}>
      <Button data-testid="NewMessage.Submit" type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default MessageForm;
