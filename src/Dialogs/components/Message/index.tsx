import React, {FC} from 'react';

import {IMessages} from '../../types';

interface IMessageProps {
  messages: IMessages;
}

const Message: FC<IMessageProps> = ({messages: {message, id}}) => <div data-testid={`NewMessage.Text.${id}`}>{message}</div>;

export default Message;
