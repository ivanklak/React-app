import React, {FC, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {Button} from 'antd';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';

import {follow, unfollow} from '../../thunks';
import {IUser} from '../../types';

interface IFollowButtonProps {
  user: IUser;
  followingInProgress: Array<number>;
}

const FollowButton: FC<IFollowButtonProps> = ({user, followingInProgress}) => {
  const dispatch = useDispatch();

  const onButtonClick = useCallback(() => (user.followed ? dispatch(unfollow(user.id)) : dispatch(follow(user.id))), [user.id, user.followed]);

  const isFollowing = followingInProgress.includes(user.id);

  return (
    <Button
      icon={user.followed ? <MinusOutlined style={{color: 'indianred'}} /> : <PlusOutlined style={{color: 'forestgreen'}} />}
      onClick={onButtonClick}
      disabled={isFollowing}
    >
      {user.followed ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default React.memo(FollowButton);
