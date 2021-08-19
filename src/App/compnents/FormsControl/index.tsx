import React, {FC} from 'react';

import {WrappedFieldMetaProps} from 'redux-form';

import styles from './styles.module.css';

interface IFormControlProps {
  meta: WrappedFieldMetaProps;
}

const FormControl: FC<IFormControlProps> = ({meta: {touched, error}, children}) => {
  const hasError = touched && error;

  return (
    <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  );
};

export default FormControl;
