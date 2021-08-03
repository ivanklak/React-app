import {connect} from 'react-redux';

import {addPostActionCreator, updateNewPostActionCreator} from '../../../Redux/state';
import MyPosts from './MyPosts';

let mapStateToProps = state => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
};
let mapDispatchToProps = dispatch => {
  return {
    updateNewPostText: text => {
      let action = updateNewPostActionCreator(text);
      dispatch(action);
    },
    addPost: newPostText => {
      dispatch(addPostActionCreator(newPostText));
    },
  };
};
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
