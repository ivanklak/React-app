import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';

import {IDialogs} from '../../../types/types';

import styles from '../styles.module.css';

const DialogItem: FC<IDialogs> = ({id, name}) => {
  const path = '/dialogs/' + id;

  return (
    <div className={styles.dialog}>
      <img src="https://consol-games.com/uploads/posts/2012-12/1356061760_1341555753_00470-01.jpg" alt="user" />

      <div className={styles.dialog + ' ' + styles.active}>
        <NavLink to={path}>{name}</NavLink>
      </div>
    </div>
  );
};

export default DialogItem;
