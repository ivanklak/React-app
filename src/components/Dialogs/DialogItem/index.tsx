import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';

import styles from '../styles.module.css';

const DialogItem: FC<any> = props => {
  const path = '/dialogs/' + props.id;

  return (
    <div className={styles.dialog}>
      <img src="https://consol-games.com/uploads/posts/2012-12/1356061760_1341555753_00470-01.jpg" alt="user" />

      <div className={styles.dialog + ' ' + styles.active}>
        <NavLink to={path}>{props.name}</NavLink>
      </div>
    </div>
  );
};

export default DialogItem;
