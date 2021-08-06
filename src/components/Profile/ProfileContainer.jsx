import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {getUserProfile, getStatus} from '../../Redux/profile-reducer';

import Profile from './Profile';
import selector from './selector';

const ProfileContainer = props => {
  const {authorizedUserId} = useSelector(selector);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = props.match.params.userId || authorizedUserId;

    if (!userId) {
      props.history.push('/login');
    }

    dispatch(getUserProfile(userId));
    dispatch(getStatus(userId));
  }, []);

  return (
    <div>
      <Profile />
    </div>
  );
};

export default withRouter(ProfileContainer);
