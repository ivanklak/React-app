import React, {FC} from 'react';

import styles from './styles.module.css';

const Post: FC<any> = props => (
  <div className={styles.item}>
    <img src="https://consol-games.com/uploads/posts/2012-12/1356061760_1341555753_00470-01.jpg" alt="avatar" />
    {props.message}
    <div>
      <span>like</span> {props.likesCount}
    </div>
  </div>
);

export default Post;
