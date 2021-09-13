import React from 'react';
// @ts-ignore
import {render, fireEvent, wait} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import '../../../../matchMedia';
import store from '../../../../App/redux-store';

import PostForm from './index';

const createTestables = (props: any) => {
  const renderResult = render(
    <BrowserRouter>
      <Provider store={store}>
        <PostForm {...props} />
      </Provider>
    </BrowserRouter>,
  );

  return renderResult;
};

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
