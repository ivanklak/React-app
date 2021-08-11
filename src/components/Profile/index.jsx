import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {getStatus, getUserProfile} from '../../Redux/profile-reducer';

import ProfileInfo from './ProfileInfo';
import MyPosts from './MyPosts';
import selector from './selector';

const Profile = props => {
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
      <ProfileInfo />
      <MyPosts />
    </div>
  );
};

export default withRouter(Profile);
