import React from 'react';

import styles from '../styles.module.css';

const Message = props => <div className={styles.dialog}>{props.message}</div>;

export default Message;
