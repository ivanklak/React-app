import React from 'react';
// @ts-ignore TypeScript definitions missing wait
import {fireEvent, render, wait} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';

import Navbar from '../Navbar';

const createTestables = () =>
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>,
  );

describe('Navbar Component', () => {
  it('should display menu items', async () => {
    const {getByText, getByTestId} = createTestables();

    await wait(() => getByTestId('Menu.Block'));

    expect(getByText('Profile')).toHaveAttribute('href', '/profile');
    expect(getByText('Dialogs')).toHaveAttribute('href', '/dialogs');
    expect(getByText('Users')).toHaveAttribute('href', '/users');
    expect(getByText('Friends')).toHaveAttribute('href', '/friends');
    expect(getByText('News')).toHaveAttribute('href', '/news');
    expect(getByText('Music')).toHaveAttribute('href', '/music');
    expect(getByText('Settings')).toHaveAttribute('href', '/settings');
  });

  it('active link', async () => {
    const selectedItemClass = 'ant-menu-item-selected';

    const {findByTestId} = createTestables();

    const profileLink = await findByTestId('MenuItem./profile');
    const usersLink = await findByTestId('MenuItem./users');

    fireEvent.click(profileLink);
    expect(profileLink).toHaveClass(selectedItemClass);
    expect(usersLink).not.toHaveClass(selectedItemClass);

    fireEvent.click(usersLink);
    expect(usersLink).toHaveClass(selectedItemClass);
    expect(profileLink).not.toHaveClass(selectedItemClass);
  });
});
