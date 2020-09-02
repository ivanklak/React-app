import React from "react";
import Profile from "./Profile";
import * as Axios from "axios";
import { connect } from "react-redux";
import { getUserProfile, getStatus, updateStatus } from "./../../Redux/profile-reducer";
import { withRouter, Redirect } from "react-router-dom";
import { usersAPI } from "../../api/api";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }
    this.props.getUserProfile(userId);
    // usersAPI.getProfile.get(userId).then(data => {
    //   this.props.setUserProfile(data.data);
    // });
    this.props.getStatus(userId);
  }

  render() {
    return (
      <div>
        <Profile
          {...this.props}
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
        />
      </div>
    );
  }
}

let mapStateToProps = state => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status
});

//стало:
export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
  withRouter
  //withAuthRedirect
)(ProfileContainer);

//было: (HOC)
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

// export default connect(mapStateToProps, { getUserProfile })(
//   WithUrlDataContainerComponent
// );
