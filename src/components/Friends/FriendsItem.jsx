import React from 'react';
import {NavLink} from 'react-router-dom';

import styles from './styles.module.css';

const FriendsItem = props => {
  const path = '/friends/' + props.id;

  return (
    <div className={styles.friends}>
      <img src="https://consol-games.com/uploads/posts/2012-12/1356061760_1341555753_00470-01.jpg" alt="friend" />
      <div className={styles.friends + ' ' + styles.active}>
        <NavLink to={path}>{props.name}</NavLink>
      </div>
    </div>
  );
};

export default FriendsItem;
