import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {logout} from '../../Redux/Authentication/thunks';
import {getLogin, getAuth} from '../../selectors';

import styles from './index.module.css';

const Header: FC = () => {
  const isAuth = useSelector(getAuth);
  const login = useSelector(getLogin);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={styles.header}>
      <NavLink to="/profile">
        <img src="https://cdn.auth0.com/blog/react-js/react.png" alt="logo" />
      </NavLink>
      <div className={styles.loginBlock}>
        {isAuth ? (
          <div>
            {login} - <button onClick={onLogout}>Log out</button>{' '}
          </div>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
