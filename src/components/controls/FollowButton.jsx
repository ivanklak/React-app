import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {follow, unfollow} from '../../Redux/users-reducer';

const FollowButton = ({user, followingInProgress}) => {
  const dispatch = useDispatch();
  const onButtonClick = () => (user.followed ? unfollowUser(user.id) : followUser(user.id));

  const followUser = useCallback(userId => {
    dispatch(follow(userId));
  }, []);
  const unfollowUser = useCallback(userId => {
    dispatch(unfollow(userId));
  }, []);

  const isFollowing = followingInProgress.includes(user.id);

  return (
    <button onClick={onButtonClick} disabled={isFollowing}>
      {user.followed ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default React.memo(FollowButton);
