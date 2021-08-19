import {AppStateType} from '../../App/redux-store';

const selector = (state: AppStateType) => ({
  users: state.usersPage.users,
  pageSize: state.usersPage.pageSize,
  totalUsersCount: state.usersPage.totalUsersCount,
  currentPage: state.usersPage.currentPage,
  followingInProgress: state.usersPage.followingInProgress,
  isFetching: state.usersPage.isFetching,
});

export default selector;
