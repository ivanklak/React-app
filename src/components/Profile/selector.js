const selector = state => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  posts: state.profilePage.posts,
});

export default selector;
