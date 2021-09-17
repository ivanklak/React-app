import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

//@ts-ignore
import {fireEvent, render, wait} from '@testing-library/react';

import '../../../matchMedia';
import store from '../../../App/redux-store';

import {AuthenticationActions} from '../../actions';
import {IAuthenticationsData} from '../../types';
import {authAPI} from '../../services';

import HeaderApp from './index';

const authData: IAuthenticationsData = {
  userId: 9208,
  email: 'ivanklak17@gmail.com',
  login: 'ivanklak',
  isAuth: true,
};
const logoutData: IAuthenticationsData = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
};

const createTestables = (props: Partial<any>) => {
  const renderResult = render(
    <BrowserRouter>
      <Provider store={store}>
        <HeaderApp {...props} />
      </Provider>
    </BrowserRouter>,
  );

  return {...renderResult, store};
};

describe('Header Component', () => {
  let mockedLogout: jest.SpyInstance;

  beforeEach(() => {
    mockedLogout = jest.spyOn(authAPI, 'logout');
  });

  it('should be rendered', () => {
    const {getByTestId} = createTestables({});

    const header = getByTestId('Header.Title');

    expect(header).toBeInTheDocument();
  });

  it('Login button should be displayed when not logged', () => {
    const {getByTestId} = createTestables({});

    const loginButton = getByTestId('LoginUser.Submit');

    expect(loginButton).toBeInTheDocument();
  });

  it('users avatar and Logout button should be displayed when logged', () => {
    store.dispatch(AuthenticationActions.getAuthUserDataSuccess(authData));

    const {getByTestId} = createTestables({});

    const userAvatar = getByTestId('LoginUser.Img');
    const logoutButton = getByTestId('LogoutUser.Submit');

    expect(userAvatar).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  it('click on logout button', async () => {
    store.dispatch(AuthenticationActions.getAuthUserDataSuccess(authData));

    const {getByTestId} = createTestables({});

    const logoutButton = getByTestId('LogoutUser.Submit');

    fireEvent.click(logoutButton);

    await wait(() => expect(mockedLogout).toHaveBeenCalledTimes(1));

    store.dispatch(AuthenticationActions.getAuthUserDataSuccess(logoutData));

    const loginButton = getByTestId('LoginUser.Submit');

    expect(loginButton).toBeInTheDocument();
  });
});
