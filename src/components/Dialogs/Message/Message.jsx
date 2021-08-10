import React from 'react';

import s from '../styles.module.css';

const Message = props => (
  <div>
    <div className={s.dialog}>{props.message}</div>
  </div>
);

export default Message;
