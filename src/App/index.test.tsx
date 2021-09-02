import React from 'react';
import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '../matchMedia';
import App from './index';

describe('App Component', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  const getState = {
    app: {
      initialized: true,
    },
    auth: {
      email: 'ivanklak17@gmail.com',
      isAuth: true,
      login: 'ivanklak',
      userId: 9208,
    },
  };

  const store = mockStore(getState);

  test('should be rendered', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>,
    );

    expect(screen.getByTestId('Header.Title')).toBeInTheDocument();
    expect(screen.getByTestId('LoginUser.Img')).toBeInTheDocument();
    expect(screen.getByTestId('LogoutUser.Submit')).toBeInTheDocument();
    expect(screen.getByTestId('LogoutUser.Submit')).toHaveTextContent('Log out');

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByTestId('MenuItem./profile')).toHaveTextContent('Profile');
    expect(screen.getByTestId('MenuItem./dialogs')).toHaveTextContent('Dialogs');
    expect(screen.getByTestId('MenuItem./users')).toHaveTextContent('Users');
    expect(screen.getByTestId('MenuItem./friends')).toHaveTextContent('Friends');
    expect(screen.getByTestId('MenuItem./news')).toHaveTextContent('News');
    expect(screen.getByTestId('MenuItem./music')).toHaveTextContent('Music');
    expect(screen.getByTestId('MenuItem./settings')).toHaveTextContent('Settings');
  });
});
