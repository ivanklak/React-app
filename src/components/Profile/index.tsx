import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import {getStatus, getUserProfile} from '../../Redux/Profile/thunks';

import ProfileInfo from './ProfileInfo';
import MyPosts from './MyPosts';
import selector from './selector';

interface IPathParams {
  userId: string;
}

const Profile: FC<RouteComponentProps<IPathParams>> = props => {
  const {authorizedUserId} = useSelector(selector);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId: number | null = Number(props.match.params.userId) || authorizedUserId;

    if (!userId) {
      props.history.push('/login');
    } else {
      dispatch(getUserProfile(userId));
      dispatch(getStatus(userId));
    }
  }, []);

  return (
    <div>
      <ProfileInfo />
      <MyPosts />
    </div>
  );
};

export default withRouter(Profile);
