import React from 'react';
import {Field, reduxForm} from 'redux-form';

import {maxLengthCreator, required} from '../../../utils/validators';
import {Textarea} from '../../common/FormsControl';

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = props => (
  <form onSubmit={props.handleSubmit}>
    <div>
      <div>New post</div>
    </div>
    <Field component={Textarea} placeholder="Click me" name="newPostText" validate={[required, maxLength10]} />
    <div>
      <button>Add post</button>
    </div>
  </form>
);

const AddNewPostFormRedux = reduxForm({form: 'profileAddNewPostForm'})(AddNewPostForm);

export default AddNewPostFormRedux;
