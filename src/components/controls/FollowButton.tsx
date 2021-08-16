import React, {FC, useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {follow, unfollow} from '../../Redux/Users/users-reducer';
import {IUser} from '../../types/types';

interface IFollowButtonProps {
  user: IUser;
  followingInProgress: Array<number>;
}

const FollowButton: FC<IFollowButtonProps> = ({user, followingInProgress}) => {
  const dispatch = useDispatch();

  const onButtonClick = useCallback(() => (user.followed ? dispatch(unfollow(user.id)) : dispatch(follow(user.id))), [user.id, user.followed]);

  const isFollowing = followingInProgress.includes(user.id);

  return (
    <button onClick={onButtonClick} disabled={isFollowing}>
      {user.followed ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default React.memo(FollowButton);
