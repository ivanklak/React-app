import {AppStateType} from '../../App/redux-store';

const selector = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  posts: state.profilePage.posts,
});

export default selector;
