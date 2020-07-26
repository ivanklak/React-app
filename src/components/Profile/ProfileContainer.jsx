import React from "react";
import Profile from "./Profile";
import * as Axios from "axios";
import { connect } from "react-redux";
import { getUserProfile } from "./../../Redux/profile-reducer";
import { withRouter, Redirect} from "react-router-dom";
import { usersAPI } from "../../api/api";

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
  }

  render() {
    if (!this.props.isAuth) return <Redirect to={"/login"} />
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} />
      </div>
    );
  }
}

let mapStateToProps = state => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth
});

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { getUserProfile })(
  WithUrlDataContainerComponent
);
