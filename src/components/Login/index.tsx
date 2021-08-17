import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {login} from '../../Redux/Authentication/auth-reducer';
import {getAuth} from '../../selectors';
import {ILoginFormData} from '../../types/types';

import LoginForm from './LoginForm';

import styles from './styles.module.css';

const Login: FC = () => {
  const isAuth = useSelector(getAuth);
  const dispatch = useDispatch();

  const onSubmit = (formData: ILoginFormData) => {
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
