import React from 'react';
import {Field, reduxForm} from 'redux-form';

import {Input} from '../common/FormsControl';
import {required} from '../../utils/validators';

import style from '../common/FormsControl/styles.module.css';
import styles from './styles.module.css';

const LoginForm = props => (
  <form onSubmit={props.handleSubmit}>
    <div>
      <Field placeholder="Email" name="email" validate={[required]} component={Input} />
    </div>
    <div>
      <Field placeholder="Password" name="password" type="password" validate={[required]} component={Input} />
    </div>
    <div className={styles.remember}>
      <Field component={Input} name="rememberMe" type="Checkbox" /> remember me
    </div>
    {props.error && <div className={style.formSummaryError}>{props.error}</div>}
    <div>
      <button className={styles.regBtn}>Login</button>
    </div>
  </form>
);

export default reduxForm({form: 'login'})(LoginForm);
