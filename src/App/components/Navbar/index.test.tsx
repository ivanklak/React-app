import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';

import Navbar from './index';

const createTestables = (props: Partial<any>) => {
  const renderResult = render(
    <BrowserRouter>
      <Navbar {...props} />
    </BrowserRouter>,
  );

  return renderResult;
};

describe('Navbar Component', () => {
  it('should display menu items', async () => {
    const {findByText} = createTestables({});

    expect(await findByText('Profile')).toHaveAttribute('href', '/profile');
    expect(await findByText('Dialogs')).toHaveAttribute('href', '/dialogs');
    expect(await findByText('Users')).toHaveAttribute('href', '/users');
    expect(await findByText('Friends')).toHaveAttribute('href', '/friends');
    expect(await findByText('News')).toHaveAttribute('href', '/news');
    expect(await findByText('Music')).toHaveAttribute('href', '/music');
    expect(await findByText('Settings')).toHaveAttribute('href', '/settings');
  });

  it('active link', async () => {
    const selectedItemClass = 'ant-menu-item-selected';

    const {findByTestId} = createTestables({});

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
