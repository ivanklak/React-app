import React, {FC} from 'react';

import styles from './styles.module.css';

interface IProps {
  message: string;
  likesCount: number;
}
const Post: FC<IProps> = ({message, likesCount}) => (
  <div className={styles.item}>
    <img src="https://consol-games.com/uploads/posts/2012-12/1356061760_1341555753_00470-01.jpg" alt="avatar" />
    {message}
    <div>
      <span>like</span> {likesCount}
    </div>
  </div>
);

export default Post;
