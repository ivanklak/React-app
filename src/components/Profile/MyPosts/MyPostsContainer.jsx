import React from "react";
import {
  addPostActionCreator,
  updateNewPostActionCreator
} from "../../../Redux/state";
import MyPosts from "./MyPosts";
import StoreContext from "../../../SroreContext";

const MyPostsContainer = () => {
  return (
    <StoreContext.Consumer>
      {store => {
        let state = store.getState();

        let addPost = () => {
          store.dispatch(addPostActionCreator());
        };

        let onPostChange = text => {
          let action = updateNewPostActionCreator(text);
          store.dispatch(action);
        };

        return (
          <MyPosts
            updateNewPostText={onPostChange}
            addPost={addPost}
            posts={state.profilePage.posts}
            newPostText={state.profilePage.newPostText}
          />
        );
      }}
    </StoreContext.Consumer>
  );
};
export default MyPostsContainer;
