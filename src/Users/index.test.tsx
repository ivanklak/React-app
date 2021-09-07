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

let usersResponse: IGetItems;
let defaultResponse: IDefaultResponse;
let profileResponse: IProfile;

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
    usersResponse = {
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
    defaultResponse = {
      data: {},
      messages: [],
      resultCode: ResultCodes.Success,
    };
    profileResponse = {
      userId: 3,
      lookingForAJob: false,
      lookingForAJobDescription: 'React',
      fullName: 'Miss Tokyo',
      contacts: null,
      photos: {small: null, large: null},
    };
  });

  afterEach(() => {
    mockedGetUsers.mockClear();
  });

  const profileRequestAction = ProfileActions.getUserProfileRequest();
  const profileSuccessAction = ProfileActions.getUserProfileSuccess(profileResponse);

  it('should be rendered', async () => {
    mockedGetUsers.mockReturnValue(Promise.resolve(usersResponse));

    createTestables({});

    expect(mockedGetUsers).toBeCalledTimes(1);
    await expect(mockedGetUsers).toBeCalledWith(1, 100);
  });

  it('page should be changed', async () => {
    mockedGetUsers.mockReturnValue(Promise.resolve(usersResponse));

    const {getByTestId, getByTitle} = createTestables({});

    expect(mockedGetUsers).toBeCalledTimes(1);
    await expect(mockedGetUsers).toBeCalledWith(1, 100);

    const pagination = getByTestId('Pagination.Block');

    expect(pagination).toBeInTheDocument();

    const secondPage = getByTitle('2');

    expect(secondPage).toBeInTheDocument();
    fireEvent.click(secondPage);
    expect(mockedGetUsers).toBeCalledTimes(2);
    await expect(mockedGetUsers).toBeCalledWith(2, 100);

    const previousPageButton = getByTitle('Previous Page');

    expect(previousPageButton).toBeInTheDocument();
    fireEvent.click(previousPageButton);
    expect(mockedGetUsers).toBeCalledTimes(3);
    await expect(mockedGetUsers).toBeCalledWith(1, 100);
  });

  it('user should be unfollowed', async () => {
    mockedGetUsers.mockReturnValue(Promise.resolve(usersResponse));
    mockedToUnfollow.mockReturnValue(Promise.resolve(defaultResponse));

    const {getByTestId} = createTestables({});

    await expect(mockedGetUsers).toBeCalledWith(1, 100);
    const userItem = getByTestId('UserItem.0');

    expect(userItem).toBeInTheDocument();

    expect(userItem).toHaveTextContent(usersResponse.items[0].name);
    expect(userItem).toHaveTextContent(usersResponse.items[0].status);

    const userAvatar = getByTestId('UserItem.Avatar.0');

    expect(userAvatar).toBeInTheDocument();

    const userUnfollowButton = getByTestId('FollowUser.Submit.0');

    expect(userUnfollowButton).toHaveTextContent('Unfollow');
    fireEvent.click(userUnfollowButton);

    expect(mockedToUnfollow).toBeCalledTimes(1);
    await expect(mockedToUnfollow).toBeCalledWith(0);
    expect(userUnfollowButton).toHaveTextContent('Follow');
  });

  it('user should be followed', async () => {
    mockedGetUsers.mockReturnValue(Promise.resolve(usersResponse));
    mockedToFollow.mockReturnValue(Promise.resolve(defaultResponse));

    const {getByTestId} = createTestables({});

    await expect(mockedGetUsers).toBeCalledWith(1, 100);
    const userItem = getByTestId('UserItem.1');

    expect(userItem).toBeInTheDocument();

    expect(userItem).toHaveTextContent(usersResponse.items[1].name);
    expect(userItem).toHaveTextContent(usersResponse.items[1].status);

    const userAvatar = getByTestId('UserItem.Avatar.1');

    expect(userAvatar).toBeInTheDocument();

    const userFollowButton = getByTestId('FollowUser.Submit.1');

    expect(userFollowButton).toHaveTextContent('Follow');
    fireEvent.click(userFollowButton);

    expect(mockedToFollow).toBeCalledTimes(1);
    await expect(mockedToFollow).toBeCalledWith(1);
    expect(userFollowButton).toHaveTextContent('Unfollow');
  });

  it('by clicking on the avatar go to the profile', async () => {
    mockedGetUsers.mockReturnValue(Promise.resolve(usersResponse));

    const {getByTestId, store} = createTestables({});

    store.dispatch(profileRequestAction);
    store.dispatch(profileSuccessAction);

    await expect(mockedGetUsers).toBeCalledWith(1, 100);
    const userAvatar = getByTestId('UserItem.Avatar.3');

    expect(userAvatar).toBeInTheDocument();
    fireEvent.click(userAvatar);

    await expect(store.dispatch).toBeCalledTimes(3);
    expect(store.dispatch).toHaveBeenNthCalledWith(2, profileRequestAction);
    expect(store.dispatch).toHaveBeenNthCalledWith(3, profileSuccessAction);
  });
});
