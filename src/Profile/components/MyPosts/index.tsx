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
      <h2>My posts</h2>
      <div className={styles.createPost}>
        <PostForm onAddPost={onAddPost} />
      </div>
      <div>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
