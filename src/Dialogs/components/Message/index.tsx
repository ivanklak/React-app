import React, {FC} from 'react';

import {IMessages} from '../../types';

interface IMessageProps {
  messages: IMessages;
}

const Message: FC<IMessageProps> = ({messages: {message}}) => <div data-testid="NewMessageText">{message}</div>;

export default Message;
