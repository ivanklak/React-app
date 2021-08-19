import React, {FC} from 'react';
import {WrappedFieldProps} from 'redux-form';

import FormControl from '../index';

const Textarea: FC<WrappedFieldProps> = props => {
  const {input, ...restProps} = props;

  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export default Textarea;
