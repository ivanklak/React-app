import React from 'react';
//@ts-ignore
import {fireEvent, render, wait} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';

import '../../../matchMedia';

import MessageForm from './index';

const createTestables = (props: any) => {
  const renderResult = render(
    <BrowserRouter>
      <MessageForm {...props} />
    </BrowserRouter>,
  );

  return renderResult;
};

describe('MessageForm Component', () => {
  it('show the sent message', async () => {
    const addNewMessage = jest.fn();
    const inputValue = 'test message';

    const {getByTestId} = createTestables({addNewMessage});

    const input = getByTestId('NewMessage.Input');

    fireEvent.change(input, {target: {value: inputValue}});
    expect(input).toHaveValue(inputValue);

    const submitButton = getByTestId('NewMessage.Submit');

    fireEvent.click(submitButton);
    await wait(() => expect(addNewMessage).toHaveBeenCalledTimes(1));
  });
});
