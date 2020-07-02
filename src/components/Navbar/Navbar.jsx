import React from "react";
import s from "./Navbar.module.css";
import {NavLink} from "react-router-dom";
import Friends from "../Friends/Friends";
import FriendsItem from "../Friends/FriendsItem";

const Navbar = (props) => {
  return (
    <nav className={s.nav}>
       
      <div className={s.item}>
        <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/users" activeClassName={s.activeLink}>Users</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/news" activeClassName={s.activeLink}>News</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/music" activeClassName={s.activeLink}>Music</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/settings" activeClassName={s.activeLink}>Settings</NavLink>
      </div>
      
      <div className={s.items}>
        <NavLink to="/friends" activeClassName={s.activeLink}>Friends</NavLink>
      </div>
      <div className={s.itemfr}>
        <FriendsItem />
      </div>
      {/* <div className={s.itemf}>
       <img src="https://consol-games.com/uploads/posts/2012-12/1356061760_1341555753_00470-01.jpg" />
      </div>
      <div className={s.itemf}>
       <img src="https://psmedia.playstation.com/is/image/psmedia/locoroco-two-column-02-ps4-eu-26apr17?$2ColExpand_Image$" />
      </div>
      <div className={s.itemf}>
       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjMiiSaZUaPGrR40wueKNydKCkk9HVcidp0JmdkHdPcHp1GrhV" />
      </div> */}
    </nav> 
  );
};
export default Navbar;
  