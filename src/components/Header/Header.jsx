import React from 'react';
import {NavLink} from 'react-router-dom';

import s from './Header.module.css';

const Header = props => {
  return (
    <header className={s.header}>
      <NavLink to={'/profile'}>
        <img src="https://cdn.auth0.com/blog/react-js/react.png"></img>
      </NavLink>
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={props.logout}>Log out</button>{' '}
          </div>
        ) : (
          <NavLink to={'/login'}>Login</NavLink>
        )}
      </div>
    </header>
  );
};
export default Header;
