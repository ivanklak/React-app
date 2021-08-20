import React, {FC} from 'react';

import {IMessages} from '../../types';

import styles from '../../styles.module.css';

interface IMessageProps {
  messages: IMessages;
}

const Message: FC<IMessageProps> = ({messages: {message}}) => (
  <div data-testid="message-text" className={styles.dialog}>
    {message}
  </div>
);

export default Message;
