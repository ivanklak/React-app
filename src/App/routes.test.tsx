import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import '../matchMedia';
import {AuthenticationActions} from '../Authentication/actions';

import {mockAuthData, createStore} from './helpers/test';
import Routes from './routes';

interface IRouterProps {
  path: string;
}

const authData = mockAuthData();
const createTestables = (props: IRouterProps) => {
  const store = createStore();

  const renderResult = render(
    <MemoryRouter initialEntries={[props.path]}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </MemoryRouter>,
  );

  return {...renderResult, store};
};

describe('router tests', () => {
  it('route path login', () => {
    const {getByTestId} = createTestables({path: '/login'});

    const loginInput = getByTestId('Email.Input');

    expect(loginInput).toBeInTheDocument();
  });

  it('route path profile', () => {
    const {getByTestId, store} = createTestables({path: '/profile'});

    store.dispatch(AuthenticationActions.getAuthUserDataSuccess(authData));

    const profileTitle = getByTestId('MyPosts.Title');

    expect(profileTitle).toBeInTheDocument();
  });

  it('route path dialogs', () => {
    const {getByTestId, store} = createTestables({path: '/dialogs'});

    store.dispatch(AuthenticationActions.getAuthUserDataSuccess(authData));

    const dialogItems = getByTestId('DialogItem.User.1');
    const dialogInput = getByTestId('NewMessage.Input');

    expect(dialogItems).toBeInTheDocument();
    expect(dialogInput).toBeInTheDocument();
  });

  it('route path users', () => {
    const {getByTestId, store} = createTestables({path: '/users'});

    store.dispatch(AuthenticationActions.getAuthUserDataSuccess(authData));

    const pagination = getByTestId('Pagination.Block');
    const usersList = getByTestId('Users.List');

    expect(pagination).toBeInTheDocument();
    expect(usersList).toBeInTheDocument();
  });
});
