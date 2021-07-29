import React from "react";
import FriendsItem from "./FriendsItem";
import s from "./Friends.module.css";

const Friends = (props) => {
  let friendsElements = props.state.friends.map((f) => (
    <FriendsItem name={f.name} />
  ));

  return <div className={s.friends}>{friendsElements}</div>;
};

export default Friends;
