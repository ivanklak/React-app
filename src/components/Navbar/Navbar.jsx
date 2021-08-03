import React from 'react';
import {NavLink} from 'react-router-dom';

import FriendsItem from '../Friends/FriendsItem';

import s from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to="/profile" activeClassName={s.activeLink}>
          Profile
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/dialogs" activeClassName={s.activeLink}>
          Messages
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/users" activeClassName={s.activeLink}>
          Users
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/news" activeClassName={s.activeLink}>
          News
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/music" activeClassName={s.activeLink}>
          Music
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/settings" activeClassName={s.activeLink}>
          Settings
        </NavLink>
      </div>

      <div className={s.items}>
        <NavLink to="/friends" activeClassName={s.activeLink}>
          Friends
        </NavLink>
      </div>
      <NavLink to="/profile">
        <div className={s.itemfr}>
          <FriendsItem />
        </div>
        <div className={s.itemfre}>
          <FriendsItem />
        </div>
        <div className={s.itemfres}>
          <FriendsItem />
        </div>
      </NavLink>
    </nav>
  );
};

export default Navbar;
