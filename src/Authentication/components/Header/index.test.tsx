import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
// @ts-ignore TypeScript definitions missing wait
import {fireEvent, render, wait} from '@testing-library/react';

import '../../../matchMedia';

import {AuthenticationActions} from '../../actions';
import {authAPI} from '../../services';

import HeaderApp from '../Header';
import {mockAuthData, reduxStore} from '../../helpers/test';

const authData = mockAuthData();
const logoutData = mockAuthData({
  userId: null,
  email: null,
  login: null,
  isAuth: false,
});
const mockedLogout: jest.SpyInstance = jest.spyOn(authAPI, 'logout');
const store = reduxStore();

const createTestables = () =>
  render(
    <BrowserRouter>
      <Provider store={store}>
        <HeaderApp />
      </Provider>
    </BrowserRouter>,
  );

describe('Header Component', () => {
  it('should be rendered', () => {
    const {getByTestId} = createTestables();

    const header = getByTestId('Header.Title');

    expect(header).toBeInTheDocument();
  });

  it('Login button should be displayed when not logged', () => {
    const {getByTestId} = createTestables();

    const loginButton = getByTestId('LoginUser.Submit');

    expect(loginButton).toBeInTheDocument();
  });

  it('users avatar and Logout button should be displayed when logged', () => {
    store.dispatch(AuthenticationActions.getAuthUserDataSuccess(authData));

    const {getByTestId} = createTestables();

    const userAvatar = getByTestId('LoginUser.Img');
    const logoutButton = getByTestId('LogoutUser.Submit');

    expect(userAvatar).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  it('click on logout button', async () => {
    store.dispatch(AuthenticationActions.getAuthUserDataSuccess(authData));

    const {getByTestId} = createTestables();

    const logoutButton = getByTestId('LogoutUser.Submit');

    fireEvent.click(logoutButton);

    await wait(() => expect(mockedLogout).toHaveBeenCalledTimes(1));

    store.dispatch(AuthenticationActions.getAuthUserDataSuccess(logoutData));

    const loginButton = getByTestId('LoginUser.Submit');

    expect(loginButton).toBeInTheDocument();
  });
});
