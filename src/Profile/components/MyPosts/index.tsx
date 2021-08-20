import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {addNewPost} from '../../thunks';
import selector from '../../selectors';
import {IPostValues} from '../../types';

import Post from './Post';
import PostForm from './PostForm';

import styles from './styles.module.css';

const MyPosts: FC = () => {
  const {posts} = useSelector(selector);
  const dispatch = useDispatch();

  const postsElements = posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);

  const onAddPost = (values: IPostValues) => {
    dispatch(addNewPost(values.newPostText));
  };

  return (
    <div className={styles.postsBlock}>
      <h3>My posts</h3>
      <PostForm onAddPost={onAddPost} />
      <div className={styles.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
