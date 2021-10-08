import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {BrowserRouter, MemoryRouter, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import '../matchMedia';
import Users from '../Users';
import {createStore} from '../App/helpers/test';

import {usersAPI} from './services';
import {mockDefaultResponse, mockUsersResponse} from './helpers/test';

interface ILocation {
  pathname: string;
}

const defaultResponse = mockDefaultResponse();
const usersResponse = mockUsersResponse();

const createTestables = () => {
  const store = createStore();

  return render(
    <BrowserRouter>
      <Provider store={store}>
        <Users />
      </Provider>
    </BrowserRouter>,
  );
};

describe('Users Component', () => {
  let mockedGetUsers: jest.SpyInstance;
  let mockedToFollow: jest.SpyInstance;
  let mockedToUnfollow: jest.SpyInstance;
  let testLocation: ILocation;

  beforeEach(() => {
    mockedGetUsers = jest.spyOn(usersAPI, 'getUsers');
    mockedToFollow = jest.spyOn(usersAPI, 'toFollow');
    mockedToUnfollow = jest.spyOn(usersAPI, 'toUnfollow');
    mockedGetUsers.mockReturnValue(Promise.resolve(usersResponse));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be rendered', async () => {
    createTestables();

    expect(mockedGetUsers).toBeCalledTimes(1);
    await expect(mockedGetUsers).toBeCalledWith({currentPage: 1, pageSize: 100});
  });

  it('page should be changed', async () => {
    const {findByTestId, getByTitle} = createTestables();

    const pagination = await findByTestId('Pagination.Block');

    expect(pagination).toBeInTheDocument();

    const firstPage = getByTitle('1');
    const secondPage = getByTitle('2');

    expect(firstPage).toHaveClass('ant-pagination-item-active');
    expect(secondPage).not.toHaveClass('ant-pagination-item-active');

    fireEvent.click(secondPage);
    await expect(mockedGetUsers).toHaveBeenNthCalledWith(2, {currentPage: 2, pageSize: 100});
    expect(firstPage).not.toHaveClass('ant-pagination-item-active');
    expect(secondPage).toHaveClass('ant-pagination-item-active');

    fireEvent.click(firstPage);
    await expect(mockedGetUsers).toHaveBeenNthCalledWith(3, {currentPage: 1, pageSize: 100});
    expect(firstPage).toHaveClass('ant-pagination-item-active');
    expect(secondPage).not.toHaveClass('ant-pagination-item-active');
  });

  it('user should be unfollowed', async () => {
    mockedToUnfollow.mockReturnValue(Promise.resolve(defaultResponse));

    const {getByTestId, findByTestId} = createTestables();

    const userItem = await findByTestId('UserItem.0');

    expect(userItem).toBeInTheDocument();

    const userUnfollowButton = getByTestId('FollowUser.Submit.0');

    expect(userUnfollowButton).toHaveTextContent('Unfollow');
    fireEvent.click(userUnfollowButton);

    await expect(mockedToUnfollow).toHaveBeenNthCalledWith(1, 0);
    expect(userUnfollowButton).toHaveTextContent('Follow');
  });

  it('user should be followed', async () => {
    mockedToFollow.mockReturnValue(Promise.resolve(defaultResponse));

    const {getByTestId, findByTestId} = createTestables();

    const userItem = await findByTestId('UserItem.1');

    expect(userItem).toBeInTheDocument();

    const userFollowButton = getByTestId('FollowUser.Submit.1');

    expect(userFollowButton).toHaveTextContent('Follow');
    fireEvent.click(userFollowButton);

    await expect(mockedToFollow).toHaveBeenNthCalledWith(1, 1);
    expect(userFollowButton).toHaveTextContent('Unfollow');
  });

  it('by clicking on the avatar go to the profile', async () => {
    const store = createStore();
    const {findByTestId} = render(
      <MemoryRouter initialEntries={['/users']}>
        <Provider store={store}>
          <Users />
          <Route
            path="*"
            render={({location}) => {
              testLocation = location;

              return null;
            }}
          />
        </Provider>
      </MemoryRouter>,
    );

    const userAvatar = await findByTestId('UserItem.Avatar.3');

    expect(userAvatar).toBeInTheDocument();
    fireEvent.click(userAvatar);

    expect(testLocation.pathname).toBe('/profile/3');
  });
});
