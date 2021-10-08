import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import '../../../matchMedia';
import {createStore} from '../../../App/helpers/test';

import Login, {ILoginComponentProps} from '../Login';

const defaultProps: ILoginComponentProps = {pathname: '*'};
const createTestables = (props: Partial<ILoginComponentProps> = {}) => {
  const store = createStore();

  return render(
    <BrowserRouter>
      <Provider store={store}>
        <Login {...defaultProps} {...props} />
      </Provider>
    </BrowserRouter>,
  );
};

describe('Login Component', () => {
  it('should be rendered', () => {
    const {getByTestId} = createTestables();

    const emailInput = getByTestId('Email.Input');
    const passwordInput = getByTestId('Password.Input');
    const checkbox = getByTestId('Checkbox.Tick');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
  });

  it('inputs shouldn`t have values', () => {
    const {getByTestId} = createTestables();

    const emailInput = getByTestId('Email.Input');
    const passwordInput = getByTestId('Password.Input');

    expect(emailInput).not.toHaveValue();
    expect(passwordInput).not.toHaveValue();
  });

  it('inputs should change values', () => {
    const {getByTestId} = createTestables();
    const emailValue = 'test@gmail.com';
    const passwordValue = 'testPassword';

    const emailInput = getByTestId('Email.Input');
    const passwordInput = getByTestId('Password.Input');

    fireEvent.change(emailInput, {target: {value: emailValue}});
    expect(emailInput).toHaveValue(emailValue);

    fireEvent.change(passwordInput, {target: {value: passwordValue}});
    expect(passwordInput).toHaveValue(passwordValue);
  });

  it('checkbox shouldn`t be checked', () => {
    const {getByTestId} = createTestables();

    const checkbox = getByTestId('Checkbox.Tick');

    expect(checkbox).not.toBeChecked();
  });

  it('checkbox should be checked after click', () => {
    const {getByTestId} = createTestables();

    const checkbox = getByTestId('Checkbox.Tick');

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
