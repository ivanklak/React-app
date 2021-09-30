import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import '../matchMedia';

import {AuthenticationActions} from '../Authentication/actions';

import Routes from './routes';
import {mockAuthData, reduxStore} from './helpers/test';

interface IRouterProps {
  path: string;
}

const authData = mockAuthData();
const logoutData = mockAuthData({
  userId: null,
  email: null,
  login: null,
  isAuth: false,
});
const store = reduxStore();
const createTestables = (props: IRouterProps) =>
  render(
    <MemoryRouter initialEntries={[props.path]}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </MemoryRouter>,
  );

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
