import React, {ComponentType} from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import '../../matchMedia';
import Login from '../../Authentication/components/Login';
import {AuthenticationActions} from '../../Authentication/actions';
import {mockAuthData, createStore} from '../helpers/test';

import withAuthRedirect from './withAuthRedirect';

const authData = mockAuthData();
const mockedComponent = () => <div>mockedComponent</div>;

describe('withAuthRedirect', () => {
  let WithAuthComponent: ComponentType;

  beforeEach(() => {
    WithAuthComponent = withAuthRedirect(mockedComponent);
  });

  it('show login component when isAuth is false', () => {
    const store = createStore();

    const {queryByText} = render(
      <BrowserRouter>
        <Provider store={store}>
          <WithAuthComponent />
          <Route path="/login" component={Login} />
        </Provider>
      </BrowserRouter>,
    );

    expect(store.getState().auth.isAuth).toBeFalsy();
    expect(queryByText('Log in')).toBeInTheDocument();
    expect(queryByText('mockedComponent')).not.toBeInTheDocument();
  });

  it('show wrapped component when isAuth is true', () => {
    const store = createStore();

    store.dispatch(AuthenticationActions.getAuthUserDataSuccess(authData));

    const {queryByText} = render(
      <BrowserRouter>
        <Provider store={store}>
          <WithAuthComponent />
        </Provider>
      </BrowserRouter>,
    );

    expect(store.getState().auth.isAuth).toBeTruthy();
    expect(queryByText('Log in')).not.toBeInTheDocument();
    expect(queryByText('mockedComponent')).toBeInTheDocument();
  });
});
