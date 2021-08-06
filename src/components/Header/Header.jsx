import React from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {logout} from '../../Redux/auth-reducer';
import {getLogin} from '../../Redux/header-selectors';
import {getAuth} from '../../Redux/auth-selectors';

import s from './Header.module.css';

export const Header = () => {
  const isAuth = useSelector(getAuth);
  const login = useSelector(getLogin);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={s.header}>
      <NavLink to={'/profile'}>
        <img src="https://cdn.auth0.com/blog/react-js/react.png" alt="logo" />
      </NavLink>
      <div className={s.loginBlock}>
        {isAuth ? (
          <div>
            {login} - <button onClick={onLogout}>Log out</button>{' '}
          </div>
        ) : (
          <NavLink to={'/login'}>Login</NavLink>
        )}
      </div>
    </header>
  );
};
