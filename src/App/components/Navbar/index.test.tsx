import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from '../../redux-store';

import Navbar from './index';

const createTestables = (props: Partial<any>) => {
  const renderResult = render(
    <BrowserRouter>
      <Provider store={store}>
        <Navbar {...props} />
      </Provider>
    </BrowserRouter>,
  );

  return renderResult;
};

describe('Navbar Component', () => {
  it('should display menu items', () => {
    const {getByText} = createTestables({});

    const profile = getByText('Profile');
    const dialogs = getByText('Dialogs');
    const users = getByText('Users');
    const friends = getByText('Friends');
    const news = getByText('News');
    const music = getByText('Music');
    const settings = getByText('Settings');

    expect(profile).toHaveAttribute('href', '/profile');
    expect(dialogs).toHaveAttribute('href', '/dialogs');
    expect(users).toHaveAttribute('href', '/users');
    expect(friends).toHaveAttribute('href', '/friends');
    expect(news).toHaveAttribute('href', '/news');
    expect(music).toHaveAttribute('href', '/music');
    expect(settings).toHaveAttribute('href', '/settings');
  });

  it('active link', async () => {
    const {getByTestId} = createTestables({});

    const profileLink = getByTestId('MenuItem./profile');
    const usersLink = getByTestId('MenuItem./users');

    fireEvent.click(profileLink);
    expect(profileLink).toHaveClass('ant-menu-item-selected');

    fireEvent.click(usersLink);
    expect(usersLink).toHaveClass('ant-menu-item-selected');
  });
});
