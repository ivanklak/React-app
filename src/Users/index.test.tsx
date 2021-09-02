import React from 'react';
import {render, screen} from '@testing-library/react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import '../matchMedia';
import Users from './index';

describe('Users Component', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  const getState = {
    usersPage: {
      users: [
        {
          id: 0,
          name: 'Post Malone',
          status: 'status 0',
          followed: true,
          photos: {small: null, large: null},
        },
      ],
      pageSize: 10,
      totalUsersCount: 1,
      currentPage: 1,
      isFetching: false,
      followingInProgress: [],
    },
  };

  let store: any;

  beforeEach(() => {
    store = mockStore(getState);
  });

  test('should be rendered', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Users />
        </Provider>
      </BrowserRouter>,
    );

    expect(screen.getByTitle('Pagination')).toBeInTheDocument();

    expect(screen.getByTestId('UserItem.0')).toBeInTheDocument();
    expect(screen.getByTestId('UserItem.0')).toHaveTextContent('Post Malone');
    expect(screen.getByTestId('UserItem.0')).toHaveTextContent('status 0');

    expect(screen.getByTestId('UserItem.Avatar.0')).toBeInTheDocument();

    expect(screen.getByTestId('FollowUser.Submit.0')).toHaveTextContent('Unfollow');
  });
});
