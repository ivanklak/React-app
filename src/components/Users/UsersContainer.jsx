import React, {useCallback, useEffect} from 'react';
import {connect} from 'react-redux';

import {follow, unfollow, setCurrentPage, toggleFollowingProgress, requestUsers} from '../../Redux/users-reducer';
import Preloader from '../Preloader/Preloader';
import {getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress, getUsers} from '../../Redux/users-selectors';

import Users from './Users';

const UsersContainer = props => {
  useEffect(() => {
    props.requestUsers(props.currentPage, props.pageSize);
  }, []);

  const onPageChanged = useCallback(pageNumber => {
    props.requestUsers(pageNumber, props.pageSize);
  }, []);

  return (
    <>
      {props.isFetching ? <Preloader /> : null}
      <Users
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onPageChanged={onPageChanged}
        users={props.users}
        follow={props.follow}
        unfollow={props.unfollow}
        followingInProgress={props.followingInProgress}
      />
    </>
  );
};

const mapStateToProps = state => ({
  users: getUsers(state),
  pageSize: getPageSize(state),
  totalUsersCount: getTotalUsersCount(state),
  currentPage: getCurrentPage(state),
  isFetching: getIsFetching(state),
  followingInProgress: getFollowingInProgress(state),
});

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setCurrentPage,
  toggleFollowingProgress,
  requestUsers,
})(UsersContainer);
