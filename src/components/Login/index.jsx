import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {login} from '../../Redux/auth-reducer';
import {getAuth} from '../../selectors';

import LoginForm from './LoginForm';

import styles from './styles.module.css';

const Login = () => {
  const isAuth = useSelector(getAuth);
  const dispatch = useDispatch();

  const onSubmit = formData => {
    dispatch(login(formData.email, formData.password, formData.rememberMe));
  };

  if (isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className={styles.form}>
      <h1>Sign in</h1>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
