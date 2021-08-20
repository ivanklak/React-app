import React, {FC} from 'react';
import {Button, Form, Input} from 'antd';

import {IPostValues} from '../../../types';

import 'antd/dist/antd.css';

interface IPostProps {
  onAddPost: (values: IPostValues) => void;
}

const PostForm: FC<IPostProps> = ({onAddPost}) => {
  const {TextArea} = Input;

  return (
    <Form name="basic" labelCol={{span: 8}} wrapperCol={{span: 10}} initialValues={{remember: true}} onFinish={onAddPost}>
      <Form.Item name="newPostText" rules={[{required: true, message: 'Please input your post!'}]}>
        <TextArea data-testid="post-textarea" />
      </Form.Item>
      <Form.Item wrapperCol={{offset: 4, span: 16}}>
        <Button data-testid="post-button" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
