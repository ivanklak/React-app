import {AppStateType} from '../../App/redux-store';

const selector = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  posts: state.profilePage.posts,
  isLoading: state.profilePage.isLoading,
});

export default selector;
