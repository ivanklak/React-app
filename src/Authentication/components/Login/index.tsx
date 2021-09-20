import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Card} from 'antd';

import {login} from '../../thunks';
import {getAuth} from '../../../App/selectors';
import {ILoginFormData} from '../../types';

import LoginForm from './LoginForm';

import styles from './styles.module.css';

const Login: FC = () => {
  const isAuth = useSelector(getAuth);
  const dispatch = useDispatch();

  const onSubmit = (formData: ILoginFormData) => {
    dispatch(login(formData));
  };

  if (isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <Card title="Log in" bordered className={styles.loginContainer}>
      <LoginForm onSubmit={onSubmit} />
    </Card>
  );
};

export default Login;
