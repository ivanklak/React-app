import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import '../matchMedia';
import store from '../App/redux-store';
import {ResultCodes} from '../App/services/api';
import {IProfile} from '../Profile/types';
import {ProfileActions} from '../Profile/actions';

import {IDefaultResponse, IGetItems, usersAPI} from './services';

import Users from './index';

const defaultResponse: IDefaultResponse = {
  data: {},
  messages: [],
  resultCode: ResultCodes.Success,
};
const profileResponse: IProfile = {
  userId: 3,
  lookingForAJob: false,
  lookingForAJobDescription: 'React',
  fullName: 'Miss Tokyo',
  contacts: null,
  photos: {small: null, large: null},
};
const usersResponse: IGetItems = {
  items: [
    {
      id: 0,
      name: 'Post Malone',
      status: 'status 0',
      followed: true,
      photos: {small: null, large: null},
    },
    {
      id: 1,
      name: 'Dipper Pines',
      status: 'status 1',
      followed: false,
      photos: {small: null, large: null},
    },
    {
      id: 2,
      name: 'Mable Pines',
      status: 'status 2',
      followed: false,
      photos: {small: null, large: null},
    },
    {
      id: 3,
      name: 'Miss Tokyo',
      status: 'status 3',
      followed: true,
      photos: {small: null, large: null},
    },
  ],
  totalCount: 154,
  error: null,
};

const createTestables = (props: Partial<any>) => {
  const renderResult = render(
    <BrowserRouter>
      <Provider store={store}>
        <Users {...props} />
      </Provider>
    </BrowserRouter>,
  );

  return {...renderResult, store};
};

describe('Users Component', () => {
  let mockedGetUsers: jest.SpyInstance;
  let mockedToFollow: jest.SpyInstance;
  let mockedToUnfollow: jest.SpyInstance;
  const dispatch = store.dispatch;

  beforeEach(() => {
    mockedGetUsers = jest.spyOn(usersAPI, 'getUsers');
    mockedToFollow = jest.spyOn(usersAPI, 'toFollow');
    mockedToUnfollow = jest.spyOn(usersAPI, 'toUnfollow');
    store.dispatch = jest.fn(dispatch);
    mockedGetUsers.mockReturnValue(Promise.resolve(usersResponse));
  });

  afterEach(() => {
    mockedGetUsers.mockClear();
  });

  it('should be rendered', async () => {
    createTestables({});

    expect(mockedGetUsers).toBeCalledTimes(1);
    await expect(mockedGetUsers).toBeCalledWith({currentPage: 1, pageSize: 100});
  });

  it('page should be changed', async () => {
    const {findByTestId, getByTitle} = createTestables({});

    const pagination = await findByTestId('Pagination.Block');

    expect(pagination).toBeInTheDocument();

    const secondPage = getByTitle('2');

    expect(secondPage).toBeInTheDocument();
    fireEvent.click(secondPage);
    await expect(mockedGetUsers).toHaveBeenNthCalledWith(2, {currentPage: 2, pageSize: 100});

    const previousPageButton = getByTitle('Previous Page');

    expect(previousPageButton).toBeInTheDocument();
    fireEvent.click(previousPageButton);
    await expect(mockedGetUsers).toHaveBeenNthCalledWith(3, {currentPage: 1, pageSize: 100});
  });

  it('user should be unfollowed', async () => {
    mockedToUnfollow.mockReturnValue(Promise.resolve(defaultResponse));

    const {getByTestId, findByTestId} = createTestables({});

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

    const {getByTestId, findByTestId} = createTestables({});

    const userItem = await findByTestId('UserItem.1');

    expect(userItem).toBeInTheDocument();

    const userFollowButton = getByTestId('FollowUser.Submit.1');

    expect(userFollowButton).toHaveTextContent('Follow');
    fireEvent.click(userFollowButton);

    await expect(mockedToFollow).toHaveBeenNthCalledWith(1, 1);
    expect(userFollowButton).toHaveTextContent('Unfollow');
  });

  it('by clicking on the avatar go to the profile', async () => {
    const {findByTestId, store} = createTestables({});

    const userAvatar = await findByTestId('UserItem.Avatar.3');

    expect(userAvatar).toBeInTheDocument();
    fireEvent.click(userAvatar);

    store.dispatch(ProfileActions.getUserProfileSuccess(profileResponse));

    await expect(store.dispatch).toHaveBeenNthCalledWith(2, ProfileActions.getUserProfileSuccess(profileResponse));
  });
});
