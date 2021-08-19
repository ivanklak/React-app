import React, {FC} from 'react';
import {WrappedFieldProps} from 'redux-form';

import FormControl from '../index';

const Input: FC<WrappedFieldProps> = props => {
  const {input, ...restProps} = props;

  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

export default Input;
