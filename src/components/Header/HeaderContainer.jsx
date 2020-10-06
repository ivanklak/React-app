import React from "react";
import Header from "./Header";
import Axios from "axios";
import { connect } from "react-redux";
import { getAuthUserData, logout } from "../../Redux/auth-reducer";
import { authAPI} from "../../api/api";

class HeaderContainer extends React.Component {
  // componentDidMount() {
  //   //authAPI.me();
  //   this.props.getAuthUserData();
  // }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect(mapStateToProps, { logout })(HeaderContainer);
