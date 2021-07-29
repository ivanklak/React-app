import React, { useEffect } from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getUserProfile,
  getStatus,
  updateStatus
} from "./../../Redux/profile-reducer";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

const ProfileContainer = ({
  authorizedUserId,
  profile,
  status,
  getUserProfile,
  getStatus,
  updateStatus,
  ...props
}) => {
  useEffect(() => {
    let userId = props.match.params.userId;
    if (!userId) {
      userId = authorizedUserId;
      if (!userId) {
        props.history.push("/login");
      }
    }
    getUserProfile(userId);
    getStatus(userId);
  }, []);

  return (
    <>
      <Profile profile={profile} status={status} updateStatus={updateStatus} />
    </>
  );
};

let mapStateToProps = state => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
});

export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
  withRouter
)(ProfileContainer);
