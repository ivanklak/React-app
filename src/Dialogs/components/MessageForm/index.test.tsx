import React from 'react';
// @ts-ignore TypeScript definitions missing wait
import {fireEvent, render, wait} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';

import '../../../matchMedia';

import MessageForm, {IMessageFormProps} from '../MessageForm';

const defaultProps: IMessageFormProps = {addNewMessage: () => ({})};

const createTestables = (props: Partial<IMessageFormProps>) =>
  render(
    <BrowserRouter>
      <MessageForm {...defaultProps} {...props} />
    </BrowserRouter>,
  );

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
