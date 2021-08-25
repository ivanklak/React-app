import React, {FC} from 'react';
import {Button, Form, Input} from 'antd';

import {IPostValues} from '../../../types';

import 'antd/dist/antd.css';
import styles from './styles.module.css';

interface IPostProps {
  onAddPost: (values: IPostValues) => void;
}

const PostForm: FC<IPostProps> = ({onAddPost}) => {
  const {TextArea} = Input;

  return (
    <Form name="basic" initialValues={{remember: true}} onFinish={onAddPost}>
      <Form.Item name="newPostText" rules={[{required: true, message: 'Please input your post!'}]}>
        <TextArea placeholder="Write your post" data-testid="NewPost.Enter" />
      </Form.Item>
      <Form.Item className={styles.buttonForm}>
        <Button className={styles.submitButton} data-testid="NewPost.Submit" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
