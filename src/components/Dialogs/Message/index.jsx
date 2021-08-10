import React from 'react';

import styles from '../styles.module.css';

const Message = props => (
  <div>
    <div className={styles.dialog}>{props.message}</div>
  </div>
);

export default Message;
