import React from "react";
import s from "./Post.module.css";

const Post = ({ message, likesCount }) => {
  return (
    <div className={s.item}>
      <img src="https://consol-games.com/uploads/posts/2012-12/1356061760_1341555753_00470-01.jpg" />
      {message}
      <div>
        <span>like</span> {likesCount}
      </div>
    </div>
  );
};
export default Post;
