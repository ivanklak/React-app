import React from 'react';
//@ts-ignore
import {render, fireEvent, wait} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';

import '../../../../matchMedia';

import LoginForm from './index';

const createTestables = (props: any) => {
  const renderResult = render(
    <BrowserRouter>
      <LoginForm {...props} />
    </BrowserRouter>,
  );

  return renderResult;
};

describe('LoginForm Component', () => {
  it('form should be submitted', async () => {
    const onSubmit = jest.fn();
    const emailValue = 'test@gmail.com';
    const passwordValue = 'testPassword';

    const {getByTestId} = createTestables({onSubmit});

    const emailInput = getByTestId('Email.Input');
    const passwordInput = getByTestId('Password.Input');
    const checkbox = getByTestId('Checkbox.Tick');
    const submitButton = getByTestId('Login.Submit');

    fireEvent.change(emailInput, {target: {value: emailValue}});
    fireEvent.change(passwordInput, {target: {value: passwordValue}});
    fireEvent.click(checkbox);
    fireEvent.click(submitButton);

    await wait(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });
});
