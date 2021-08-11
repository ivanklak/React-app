import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {addNewPost} from '../../../Redux/profile-reducer';
import selector from '../selector';

import Post from './Post';
import AddNewPostFormRedux from './PostForm';

import styles from './styles.module.css';

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
