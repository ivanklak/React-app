import React from 'react';
// @ts-ignore TypeScript definitions missing wait
import {fireEvent, render, wait} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';

import '../../../matchMedia';

import MessageForm, {IPostProps} from '../MessageForm';

describe('MessageForm Component', () => {
  let addNewMessage: jest.Mock;
  let defaultProps: IPostProps;

  beforeEach(() => {
    addNewMessage = jest.fn();
    defaultProps = {addNewMessage};
  });

  const createTestables = (props: Partial<IPostProps>) =>
    render(
      <BrowserRouter>
        <MessageForm {...defaultProps} {...props} />
      </BrowserRouter>,
    );

  it('show the sent message', async () => {
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
