import React, {FC} from 'react';

import {IMessages} from '../../types';

interface IMessageProps {
  messages: IMessages;
}

const Message: FC<IMessageProps> = ({messages: {message}}) => <div>{message}</div>;

export default Message;
