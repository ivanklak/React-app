import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import {getStatus, getUserProfile} from './thunks';

import ProfileInfo from './components/ProfileInfo';
import MyPosts from './components/MyPosts';
import selector from './components/selector';

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
