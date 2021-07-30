import React from 'react';
import s from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

const DialogItem = props => {
  let path = '/dialogs/' + props.id;
  return (
    <div className={s.dialog}>
      <img src="https://consol-games.com/uploads/posts/2012-12/1356061760_1341555753_00470-01.jpg" />

      <div className={s.dialog + ' ' + s.active}>
        <NavLink to={path}>{props.name}</NavLink>
      </div>
    </div>
  );
};

export default DialogItem;
