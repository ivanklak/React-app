import React, {FC} from 'react';

interface INickNameProps {
  name: string;
}

const NickName: FC<INickNameProps> = ({name}) => <div>{name}</div>;

export default NickName;
