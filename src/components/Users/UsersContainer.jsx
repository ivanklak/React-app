import React from "react";
import { connect } from "react-redux";
import UsersAPIComponent from "./Users";
import { followAC, unfollowAC, setUserswAC, setCurrentPageAC, setUsersTotalCountAC } from "../../Redux/users-reducer";

let mapStateToProps = state => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage
  };
};

let mapDispatchToProps = dispatch => {
  return {
    follow: userId => {
      dispatch(followAC(userId));
    },
    unfollow: userId => {
      dispatch(unfollowAC(userId));
    },
    setUsers: users => {
      dispatch(setUserswAC(users));
    },
    setCurrentPage: pageNumber => {
        dispatch(setCurrentPageAC(pageNumber))
    },
    setTotalUsersCount: totalCount => {
        dispatch(setUsersTotalCountAC(totalCount))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent);
