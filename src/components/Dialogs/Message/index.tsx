import React, {FC} from 'react';

import styles from '../styles.module.css';

interface IMessageProps {
  message: string;
}

const Message: FC<IMessageProps> = ({message}) => <div className={styles.dialog}>{message}</div>;

export default Message;
