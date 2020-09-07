import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";

const MyPosts = props => {
  let postsElements = props.posts.map(p => (
    <Post message={p.message} likesCount={p.likesCount} />
  ));

  let newPostElement = React.createRef();

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  };

  // let onPostChange = () => {
  //   let text = newPostElement.current.value;
  //   props.updateNewPostText(text);
  // };


  //ojoon
  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      {/* <form>
        <div>
          <div>New post</div>
        </div>
        <textarea
          onChange={onPostChange}
          ref={newPostElement}
          value={props.newPostText}
        />
      </form>
      <div>
        <button onClick={onAddPost}>Add post</button>
        <button>Remove</button>
      </div> */}
      <AddNewPostFormRedux onSubmit={onAddPost} />

      <div className={s.posts}>
        {postsElements}
        {/* <Post message= {postData[0].message} likesCount={postData[0].likesCount} />
        <Post message= {postData[1].message} likesCount={postData[1].likesCount}/> */}
      </div>
    </div>
  );
};

const AddNewPostForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <div>New post</div>
      </div>
      <Field component={"textarea"} name="newPostText" />
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const AddNewPostFormRedux = reduxForm({ form: "profileAddNewPostForm" })(
  AddNewPostForm
);

export default MyPosts;
