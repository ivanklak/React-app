import React, {ComponentType} from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import '../../matchMedia';
import store from '../redux-store';

import Login from '../../Authentication/components/Login';

import {AuthenticationActions} from '../../Authentication/actions';
import {mockAuthData} from '../helpers/test';

import withAuthRedirect from './withAuthRedirect';

const authData = mockAuthData();
const mockedComponent = () => <div>mockedComponent</div>;

describe('withAuthRedirect', () => {
  let WithAuthComponent: ComponentType;

  beforeEach(() => {
    WithAuthComponent = withAuthRedirect(mockedComponent);
  });

  it('show login component when isAuth is false', () => {
    const {getByText} = render(
      <BrowserRouter>
        <Provider store={store}>
          <WithAuthComponent />
          <Route path="/login" component={Login} />
        </Provider>
      </BrowserRouter>,
    );

    expect(store.getState().auth.isAuth).toBeFalsy();
    expect(getByText('Log in')).toBeInTheDocument();
  });

  it('show wrapped component when isAuth is true', () => {
    store.dispatch(AuthenticationActions.getAuthUserDataSuccess(authData));

    const {getByText} = render(
      <BrowserRouter>
        <Provider store={store}>
          <WithAuthComponent />
        </Provider>
      </BrowserRouter>,
    );

    expect(store.getState().auth.isAuth).toBeTruthy();
    expect(getByText('mockedComponent')).toBeInTheDocument();
  });
});
