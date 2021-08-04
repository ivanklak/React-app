import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';

import {getUserProfile, getStatus, updateStatus} from '../../Redux/profile-reducer';

import Profile from './Profile';

const ProfileContainer = props => {
  useEffect(() => {
    const userId = props.match.params.userId ? props.match.params.userId : props.authorizedUserId;

    if (!userId) {
      props.history.push('/login');
    }

    props.getUserProfile(userId);
    props.getStatus(userId);
  }, []);

  return (
    <div>
      <Profile {...props} profile={props.profile} status={props.status} updateStatus={props.updateStatus} />
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export default compose(connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}), withRouter)(ProfileContainer);
