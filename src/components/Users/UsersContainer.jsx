import React from "react";
import { connect } from "react-redux";
import Users from "./Users";
import { followAC, unfollowAC, setUserswAC } from "../../Redux/users-reducer";

let mapStateToProps = state => {
  return {
    users: state.usersPage.users
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
