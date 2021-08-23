import React, {FC} from 'react';
import {Button, Checkbox, Form, Input} from 'antd';

import {ILoginFormData} from '../../../types';

interface ILoginProps {
  onSubmit: (formData: ILoginFormData) => void;
}

const LoginForm: FC<ILoginProps> = ({onSubmit}) => (
  <Form name="basic" labelCol={{offset: 1, span: 5}} wrapperCol={{span: 16}} initialValues={{remember: true}} onFinish={onSubmit}>
    <Form.Item label="Email" name="email" rules={[{required: true, message: 'Please input your email!'}]}>
      <Input data-testid="Email.Enter" />
    </Form.Item>

    <Form.Item label="Password" name="password" rules={[{required: true, message: 'Please input your password!'}]}>
      <Input.Password data-testid="Password.Enter" />
    </Form.Item>

    <Form.Item name="rememberMe" valuePropName="checked" wrapperCol={{offset: 9, span: 16}}>
      <Checkbox data-testid="Checkbox.Enter">Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{offset: 10, span: 11}}>
      <Button data-testid="Login.Submit" type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default LoginForm;
