import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';

import {IDialogs} from '../../types';

import styles from '../../styles.module.css';

interface IDialogsItemProps {
  dialog: IDialogs;
}

const DialogItem: FC<IDialogsItemProps> = ({dialog: {id, name}}) => {
  const path = '/dialogs/' + id;

  return (
    <div className={styles.dialog}>
      <img className={styles.dialogsImage} src="https://consol-games.com/uploads/posts/2012-12/1356061760_1341555753_00470-01.jpg" alt="user" />
      <div className={styles.dialog + ' ' + styles.active}>
        <NavLink to={path}>{name}</NavLink>
      </div>
    </div>
  );
};

export default DialogItem;
