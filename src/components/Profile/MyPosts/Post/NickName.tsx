import React, {FC} from 'react';

interface IProps {
  name: string;
}

const NickName: FC<IProps> = ({name}) => <div>{name}</div>;

export default NickName;
