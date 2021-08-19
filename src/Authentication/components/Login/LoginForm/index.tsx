import React, {FC} from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';

import Input from '../../../../App/components/FormsControl/Input';
import {required} from '../../../../App/validators';
import {ILoginFormData} from '../../../types';

import styles from '../styles.module.css';

const LoginForm: FC<InjectedFormProps<ILoginFormData>> = ({handleSubmit, error}) => (
  <form onSubmit={handleSubmit}>
    <div>
      <Field placeholder="Email" name="email" validate={[required]} component={Input} />
    </div>
    <div>
      <Field placeholder="Password" name="password" type="password" validate={[required]} component={Input} />
    </div>
    <div className={styles.remember}>
      <Field component={Input} name="rememberMe" type="Checkbox" /> remember me
    </div>
    {error && <div className={styles.formSummaryError}>{error}</div>}
    <div>
      <button className={styles.regBtn}>Login</button>
    </div>
  </form>
);

export default reduxForm<ILoginFormData>({form: 'login'})(LoginForm);
