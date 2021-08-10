import React from 'react';
import {Field, reduxForm} from 'redux-form';

import {useDispatch, useSelector} from 'react-redux';

import {required, maxLengthCreator} from '../../../utils/validators/validators';
import {Textarea} from '../../common/FormsControl/FormsControls';
import {addNewPost} from '../../../Redux/profile-reducer';
import selector from '../selector';

import Post from './Post';

import styles from './styles.module.css';

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = props => (
  <form onSubmit={props.handleSubmit}>
    <div>
      <div>New post</div>
    </div>
    <Field component={Textarea} placeholder="Click me" name="newPostText" validate={[required, maxLength10]} />
    <div>
      <button>Add post</button>
    </div>
  </form>
);

const AddNewPostFormRedux = reduxForm({form: 'profileAddNewPostForm'})(AddNewPostForm);

const MyPosts = () => {
  const {posts} = useSelector(selector);
  const dispatch = useDispatch();

  const postsElements = posts.map(p => <Post key={p.message} message={p.message} likesCount={p.likesCount} />);

  const onAddPost = values => {
    dispatch(addNewPost(values.newPostText));
  };

  return (
    <div className={styles.postsBlock}>
      <h3>My posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />

      <div className={styles.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
