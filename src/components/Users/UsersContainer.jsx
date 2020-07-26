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
  getUsers
} from "../../Redux/users-reducer";
import Users from "./Users";
import * as Axios from "axios";
import Preloader from "../Preloader/Preloader";
import { usersAPI } from "../../api/api";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);

    // перенесли в reducer
    //   this.props.setTougleIsFetching(true);
    //   usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
    //     this.props.setTougleIsFetching(false);
    //     this.props.setUsers(data.items);
    //     this.props.setTotalUsersCount(data.totalCount);
    // });
  }

  onPageChanged = pageNumber => {
    this.props.getUsers(pageNumber, this.props.pageSize);
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

let mapStateToProps = state => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress
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

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setCurrentPage,
  toggleFollowingProgress,
  getUsers
})(UsersContainer);
