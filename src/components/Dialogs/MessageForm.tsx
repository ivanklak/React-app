import React, {FC} from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';

import {Textarea} from '../common/FormsControl';
import {maxLengthCreator, required} from '../../utils/validators';
import {IMessageValues} from '../../types/types';

import styles from './styles.module.css';

const maxLength50 = maxLengthCreator(50);

const MessageForm: FC<InjectedFormProps<IMessageValues>> = ({handleSubmit}) => (
  <form onSubmit={handleSubmit}>
    <div className={styles.form}>
      <Field component={Textarea} validate={[required, maxLength50]} name="newMessageBody" placeholder="Enter your message" className={styles.messageInput} />
    </div>
    <div>
      <button>Send</button>
    </div>
  </form>
);

export default reduxForm<IMessageValues>({form: 'dialogAddMessageForm'})(MessageForm);
