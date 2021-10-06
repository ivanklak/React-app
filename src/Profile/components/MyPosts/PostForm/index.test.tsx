import React from 'react';
// @ts-ignore TypeScript definitions missing wait
import {render, fireEvent, wait} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';

import '../../../../matchMedia';

import PostForm, {IPostProps} from '../PostForm';

const onAddPost = () => ({});
const defaultProps: IPostProps = {onAddPost};

const createTestables = (props: Partial<IPostProps>) =>
  render(
    <BrowserRouter>
      <PostForm {...defaultProps} {...props} />
    </BrowserRouter>,
  );

describe('PostForm Component', () => {
  it('show the sent post', async () => {
    const onAddPost = jest.fn();
    const textareaValue = 'This is my third post';

    const {getByTestId} = createTestables({onAddPost});

    const textarea = getByTestId('NewPost.Input');
    const submitButton = getByTestId('NewPost.Submit');

    fireEvent.change(textarea, {target: {value: textareaValue}});
    fireEvent.click(submitButton);

    await wait(() => expect(onAddPost).toHaveBeenCalledTimes(1));
  });
});
