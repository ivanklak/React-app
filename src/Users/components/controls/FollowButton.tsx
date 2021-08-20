import React, {FC, useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {Button} from 'antd';

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
    <Button onClick={onButtonClick} disabled={isFollowing}>
      {user.followed ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default React.memo(FollowButton);
