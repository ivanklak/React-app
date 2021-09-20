import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import '../matchMedia';

import {AuthenticationActions} from '../Authentication/actions';
import {IAuthenticationsData} from '../Authentication/types';

import store from './redux-store';
import Routes from './routes';

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

const createTestables = (props: any) => {
  const renderResult = render(
    <MemoryRouter initialEntries={[props.path]} initialIndex={0}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </MemoryRouter>,
  );

  return renderResult;
};

describe('router tests', () => {
  beforeEach(() => {
    store.dispatch(AuthenticationActions.getAuthUserDataSuccess(authData));
  });

  it('route path login', () => {
    store.dispatch(AuthenticationActions.getAuthUserDataSuccess(logoutData));

    const {getByTestId} = createTestables({path: '/login'});

    const loginInput = getByTestId('Email.Input');

    expect(loginInput).toBeInTheDocument();
  });

  it('route path profile', () => {
    const {getByTestId} = createTestables({path: '/profile'});

    const profileTitle = getByTestId('MyPosts.Title');

    expect(profileTitle).toBeInTheDocument();
  });

  it('route path dialogs', () => {
    const {getByTestId} = createTestables({path: '/dialogs'});

    const dialogItems = getByTestId('DialogItem.User.1');
    const dialogInput = getByTestId('NewMessage.Input');

    expect(dialogItems).toBeInTheDocument();
    expect(dialogInput).toBeInTheDocument();
  });

  it('route path users', () => {
    const {getByTestId} = createTestables({path: '/users'});

    const pagination = getByTestId('Pagination.Block');
    const usersList = getByTestId('Users.List');

    expect(pagination).toBeInTheDocument();
    expect(usersList).toBeInTheDocument();
  });
});
