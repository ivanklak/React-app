import React from 'react';
import {Field, reduxForm} from 'redux-form';

import {Textarea} from '../common/FormsControl';
import {maxLengthCreator, required} from '../../utils/validators';

import styles from './styles.module.css';

const maxLength50 = maxLengthCreator(50);

const MessageForm = props => (
  <form onSubmit={props.handleSubmit}>
    <div className={styles.form}>
      <Field component={Textarea} validate={[required, maxLength50]} name="newMessageBody" placeholder="Enter your message" className={styles.messageInput} />
    </div>
    <div>
      <button>Send</button>
    </div>
  </form>
);

export default reduxForm({form: 'dialogAddMessageForm'})(MessageForm);
