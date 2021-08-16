import React, {FC, useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {follow, unfollow} from '../../Redux/Users/users-reducer';
import {UserType} from '../../types/types';

interface IProps {
  user: UserType;
  followingInProgress: Array<number>;
}

const FollowButton: FC<IProps> = ({user, followingInProgress}) => {
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
