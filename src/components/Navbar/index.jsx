import React from 'react';
import {NavLink} from 'react-router-dom';

import FriendsItem from '../Friends/FriendsItem';

import styles from './styles.module.css';

const Navbar = () => (
  <nav className={styles.nav}>
    <div className={styles.item}>
      <NavLink to="/profile" activeClassName={styles.activeLink}>
        Profile
      </NavLink>
    </div>
    <div className={styles.item}>
      <NavLink to="/dialogs" activeClassName={styles.activeLink}>
        Messages
      </NavLink>
    </div>
    <div className={styles.item}>
      <NavLink to="/users" activeClassName={styles.activeLink}>
        Users
      </NavLink>
    </div>
    <div className={styles.item}>
      <NavLink to="/news" activeClassName={styles.activeLink}>
        News
      </NavLink>
    </div>
    <div className={styles.item}>
      <NavLink to="/music" activeClassName={styles.activeLink}>
        Music
      </NavLink>
    </div>
    <div className={styles.item}>
      <NavLink to="/settings" activeClassName={styles.activeLink}>
        Settings
      </NavLink>
    </div>
    <div className={styles.items}>
      <NavLink to="/friends" activeClassName={styles.activeLink}>
        Friends
      </NavLink>
    </div>
    <NavLink to="/profile">
      <div className={styles.itemfr}>
        <FriendsItem />
      </div>
      <div className={styles.itemfre}>
        <FriendsItem />
      </div>
      <div className={styles.itemfres}>
        <FriendsItem />
      </div>
    </NavLink>
  </nav>
);

export default Navbar;
