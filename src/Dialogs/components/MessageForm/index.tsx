import React, {FC} from 'react';
import {Button, Form, Input} from 'antd';

import {IMessageValues} from '../../types';

import 'antd/dist/antd.css';
import styles from './styles.module.css';

interface IPostProps {
  addNewMessage: (values: IMessageValues) => void;
}

const MessageForm: FC<IPostProps> = ({addNewMessage}) => (
  <Form layout="inline" initialValues={{remember: true}} onFinish={addNewMessage}>
    <Form.Item name="newMessageBody" rules={[{required: true, message: 'Please input your message'}]}>
      <Input className={styles.messageEnter} data-testid="NewMessage.Input" />
    </Form.Item>
    <Form.Item>
      <Button data-testid="NewMessage.Submit" type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default MessageForm;
