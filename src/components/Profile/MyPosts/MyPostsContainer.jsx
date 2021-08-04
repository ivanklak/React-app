import {connect} from 'react-redux';

import {addPostActionCreator, updateNewPostActionCreator} from '../../../Redux/state';

import MyPosts from './MyPosts';

const mapStateToProps = state => ({
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  });
const mapDispatchToProps = dispatch => ({
    updateNewPostText: text => {
      const action = updateNewPostActionCreator(text);

      dispatch(action);
    },
    addPost: newPostText => {
      dispatch(addPostActionCreator(newPostText));
    },
  });
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
