import React, {FC} from 'react';

import {Button, Form, Input} from 'antd';

import {IMessageValues} from '../../types';
import 'antd/dist/antd.css';

interface IPostProps {
  addNewMessage: (values: IMessageValues) => void;
}

const MessageForm: FC<IPostProps> = ({addNewMessage}) => (
  <Form layout="inline" name="basic" labelCol={{span: 6}} wrapperCol={{span: 26}} initialValues={{remember: true}} onFinish={addNewMessage}>
    <Form.Item name="newMessageBody" rules={[{required: true, message: 'Please input your message'}]}>
      <Input data-testid="message-input" />
    </Form.Item>
    <Form.Item wrapperCol={{span: 16}}>
      <Button data-testid="message-button" type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default MessageForm;
