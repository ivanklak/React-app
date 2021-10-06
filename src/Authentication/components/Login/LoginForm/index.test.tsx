import React from 'react';
// @ts-ignore TypeScript definitions missing wait
import {render, fireEvent, wait} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';

import '../../../../matchMedia';

import LoginForm, {ILoginProps} from '../LoginForm';

describe('LoginForm Component', () => {
  let onSubmit: jest.Mock;
  let defaultProps: ILoginProps;

  beforeEach(() => {
    onSubmit = jest.fn();
    defaultProps = {onSubmit};
  });

  const createTestables = (props: Partial<ILoginProps>) =>
    render(
      <BrowserRouter>
        <LoginForm {...defaultProps} {...props} />
      </BrowserRouter>,
    );

  it('form should be submitted', async () => {
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
