import React from 'react';
// @ts-ignore TypeScript definitions missing wait
import {render, fireEvent, wait} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';

import '../../../../matchMedia';

import PostForm, {IPostProps} from '../PostForm';

describe('PostForm Component', () => {
  let onAddPost: jest.Mock;
  let defaultProps: IPostProps;

  beforeEach(() => {
    onAddPost = jest.fn();
    defaultProps = {onAddPost};
  });

  const createTestables = (props: Partial<IPostProps>) =>
    render(
      <BrowserRouter>
        <PostForm {...defaultProps} {...props} />
      </BrowserRouter>,
    );

  it('show the sent post', async () => {
    const textareaValue = 'This is my third post';

    const {getByTestId} = createTestables({onAddPost});

    const textarea = getByTestId('NewPost.Input');
    const submitButton = getByTestId('NewPost.Submit');

    fireEvent.change(textarea, {target: {value: textareaValue}});
    fireEvent.click(submitButton);

    await wait(() => expect(onAddPost).toHaveBeenCalledTimes(1));
  });
});
