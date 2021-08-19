import React, {FC} from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';

import {maxLengthCreator, required} from '../../../../App/validators';
import Textarea from '../../../../App/components/FormsControl/Textarea';
import {IPostValues} from '../../../types';

const maxLength10 = maxLengthCreator(10);

const PostForm: FC<InjectedFormProps<IPostValues>> = ({handleSubmit}) => (
  <form onSubmit={handleSubmit}>
    <div>
      <div>New post</div>
    </div>
    <Field component={Textarea} placeholder="Click me" name="newPostText" validate={[required, maxLength10]} />
    <div>
      <button>Add post</button>
    </div>
  </form>
);

export default reduxForm<IPostValues>({form: 'profileAddNewPostForm'})(PostForm);
