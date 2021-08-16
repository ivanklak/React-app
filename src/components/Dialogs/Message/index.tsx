import React, {FC} from 'react';

import styles from '../styles.module.css';

interface IProps {
  message: string;
}

const Message: FC<IProps> = ({message}) => <div className={styles.dialog}>{message}</div>;

export default Message;
