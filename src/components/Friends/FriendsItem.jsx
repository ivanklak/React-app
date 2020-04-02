import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Friends.module.css";

const FriendsItem = props => {
  let path = "/friends/" + props.id;
  return (
    <div className={s.friends}>
        <img src="https://consol-games.com/uploads/posts/2012-12/1356061760_1341555753_00470-01.jpg" />
      <div className={s.friends + " " + s.active}> 
      <NavLink to={path}>{props.name}</NavLink>
      </div>
    </div>
  );
};

export default FriendsItem;
