import React, {FC} from 'react';
import {Button, Form, Input} from 'antd';

import {IPostValues} from '../../../types';

import styles from './styles.module.css';

const {TextArea} = Input;

export interface IPostProps {
  onAddPost: (values: IPostValues) => void;
}

const PostForm: FC<IPostProps> = ({onAddPost}) => {
  const [form] = Form.useForm();

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    form.validateFields().then(values => {
      onAddPost(values);
    });
  };

  return (
    <Form initialValues={{remember: true}} data-testid="Form.Submit" form={form}>
      <Form.Item name="newPostText" rules={[{required: true, message: 'Please input your post!'}]}>
        <TextArea placeholder="Write your post" data-testid="NewPost.Input" />
      </Form.Item>
      <Form.Item className={styles.buttonForm}>
        <Button className={styles.submitButton} onClick={onSubmit} data-testid="NewPost.Submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
