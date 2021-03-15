import React from "react";
import { connect } from "react-redux";
import {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  setTougleIsFetching,
  toggleFollowingProgress,
  requestUsers
} from "../../Redux/users-reducer";
import Users from "./Users";
import * as Axios from "axios";
import Preloader from "../Preloader/Preloader";
import { usersAPI } from "../../api/api";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import {
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
  getUsers
} from "../../Redux/users-selectors";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    console.log(this.props);
    // перенесли в reducer
    //   this.props.setTougleIsFetching(true);
    //   usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
    //     this.props.setTougleIsFetching(false);
    //     this.props.setUsers(data.items);
    //     this.props.setTotalUsersCount(data.totalCount);
    // });
  }

  onPageChanged = pageNumber => {
    this.props.requestUsers(pageNumber, this.props.pageSize);
  };
  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

//users-selectors
let mapStateToProps = state => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
  };
};

// let mapDispatchToProps = dispatch => {
//   return {
//     follow: userId => {
//       dispatch(followAC(userId));
//     },
//     unfollow: userId => {
//       dispatch(unfollowAC(userId));
//     },
//     setUsers: users => {
//       dispatch(setUserswAC(users));
//     },
//     setCurrentPage: pageNumber => {
//       dispatch(setCurrentPageAC(pageNumber));
//     },
//     setTotalUsersCount: totalCount => {
//       dispatch(setUsersTotalCountAC(totalCount));
//     },
//     setTougleIsFetching: isFetching => {
//         dispatch(setTougleIsFetchingAC(isFetching));
//     }
//   };
// };

//let withRedirect = withAuthRedirect(UsersContainer);

export default compose(
  withAuthRedirect, //защита
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingProgress,
    requestUsers
  })
)(UsersContainer);

// export default withAuthRedirect(connect(mapStateToProps, {
//   follow,
//   unfollow,
//   setCurrentPage,
//   toggleFollowingProgress,
//   getUsers
// })(UsersContainer));
