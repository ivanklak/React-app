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
  it('should display menu items', async () => {
    const {findByText} = createTestables({});

    const profile = await findByText('Profile');
    const dialogs = await findByText('Dialogs');
    const users = await findByText('Users');
    const friends = await findByText('Friends');
    const news = await findByText('News');
    const music = await findByText('Music');
    const settings = await findByText('Settings');

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
