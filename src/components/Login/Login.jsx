import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {Input} from '../common/FormsControl/FormsControls';
import {required} from '../../utils/validators/validators';
import {login} from '../../Redux/auth-reducer';
import {getAuth} from '../../Redux/auth-selectors';

import style from '../common/FormsControl/FormsControls.module.css';
import s from './Login.module.css';

const LoginForm = props => (
  <form onSubmit={props.handleSubmit}>
    <div>
      <Field placeholder={'Email'} name={'email'} validate={[required]} component={Input} />
    </div>
    <div>
      <Field placeholder={'Password'} name={'password'} type={'password'} validate={[required]} component={Input} />
    </div>
    <div className={s.remember}>
      <Field component={Input} name={'rememberMe'} type={'Checkbox'} /> remember me
    </div>
    {props.error && <div className={style.formSummaryError}>{props.error}</div>}
    <div>
      <button className={s.regBtn}>Login</button>
    </div>
  </form>
);

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

export const Login = () => {
  const isAuth = useSelector(getAuth);
  const dispatch = useDispatch();

  const onSubmit = formData => {
    dispatch(login(formData.email, formData.password, formData.rememberMe));
  };

  if (isAuth) {
    return <Redirect to={'/profile'} />;
  }

  return (
    <div className={s.form}>
      <h1>Sign in</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};
