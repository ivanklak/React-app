import React, {FC} from 'react';

import styles from '../styles.module.css';

const Message: FC<any> = props => <div className={styles.dialog}>{props.message}</div>;

export default Message;
