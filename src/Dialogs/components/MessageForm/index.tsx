import React, {FC} from 'react';

import {Button, Form, Input} from 'antd';

import {IMessageValues} from '../../types';
import 'antd/dist/antd.css';

interface IPostProps {
  addNewMessage: (values: IMessageValues) => void;
}

const MessageForm: FC<IPostProps> = ({addNewMessage}) => (
  <Form layout="inline" name="basic" labelCol={{span: 12}} wrapperCol={{span: 24}} initialValues={{remember: true}} onFinish={addNewMessage}>
    <Form.Item name="newMessageBody" rules={[{required: true, message: 'Please input your message'}]}>
      <Input data-testid="NewMessage.Enter" />
    </Form.Item>
    <Form.Item wrapperCol={{span: 24}}>
      <Button data-testid="NewMessage.Submit" type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default MessageForm;
