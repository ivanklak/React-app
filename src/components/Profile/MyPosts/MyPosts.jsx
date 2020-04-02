import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = props => {
  let postsElements = props.posts.map(p => (
    <Post message={p.message} likesCount={p.likesCount} />
  ));

  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
  };  

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  }; 

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <div>New post</div>
        </div>
        <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText} />
      </div>
      <div>
        <button onClick={onAddPost}>Add post</button>
        <button>Remove</button>
      </div>

      <div className={s.posts}>
        {postsElements}
        {/* <Post message= {postData[0].message} likesCount={postData[0].likesCount} />
        <Post message= {postData[1].message} likesCount={postData[1].likesCount}/> */}
      </div>
    </div>
  );
};
export default MyPosts;
