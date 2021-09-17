import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import '../matchMedia';
import store from '../App/redux-store';
import {AuthenticationActions} from '../Authentication/actions';
import {IAuthenticationsData} from '../Authentication/types';

import {profileAPI} from './services';
import {IProfile} from './types';

import Profile from './index';

const profileResponse: IProfile = {
  userId: 9208,
  lookingForAJob: false,
  lookingForAJobDescription: 'React',
  fullName: 'ivanklak',
  contacts: null,
  photos: {small: null, large: null},
};
const statusResponse = '#bitcoin';
const authData: IAuthenticationsData = {
  userId: 9208,
  email: 'ivanklak17@gmail.com',
  login: 'ivanklak',
  isAuth: true,
};
const textareaValue = 'This is my third post';

const createTestables = (props: Partial<any>) => {
  const renderResult = render(
    <BrowserRouter>
      <Provider store={store}>
        <Profile {...props} />
      </Provider>
    </BrowserRouter>,
  );

  return renderResult;
};

describe('Profile Component', () => {
  let mockedGetProfile: jest.SpyInstance;
  let mockedGetStatus: jest.SpyInstance;

  beforeEach(() => {
    mockedGetProfile = jest.spyOn(profileAPI, 'getProfile');
    mockedGetStatus = jest.spyOn(profileAPI, 'getStatus');
    store.dispatch(AuthenticationActions.getAuthUserDataSuccess(authData));
    mockedGetProfile.mockReturnValue(Promise.resolve(profileResponse));
  });

  it('should be rendered', async () => {
    mockedGetStatus.mockReturnValue(Promise.resolve(statusResponse));

    createTestables({});

    expect(mockedGetProfile).toBeCalledTimes(1);
    expect(mockedGetStatus).toBeCalledTimes(1);
    await expect(mockedGetProfile).toBeCalledWith(profileResponse.userId);
    await expect(mockedGetStatus).toBeCalledWith(profileResponse.userId);
  });

  it('clicking on the status opens the edit mode', async () => {
    mockedGetStatus.mockReturnValue(Promise.resolve(statusResponse));

    const {getByTestId} = createTestables({});

    await expect(mockedGetStatus).toBeCalledWith(profileResponse.userId);

    const defaultStatus = getByTestId('DefaultStatus.Text');

    expect(defaultStatus).toBeInTheDocument();
    expect(defaultStatus).toHaveTextContent(statusResponse);

    fireEvent.doubleClick(defaultStatus);

    const editStatus = getByTestId('NewStatus.Input');

    expect(editStatus).toBeInTheDocument();
    expect(editStatus).toHaveValue(statusResponse);
  });

  it('my posts should be displayed', () => {
    const {getByTestId} = createTestables({});

    const myPosts = getByTestId('MyPosts.Title');

    expect(myPosts).toBeInTheDocument();

    const postItem = getByTestId('NewPost.Message.1');

    expect(postItem).toBeInTheDocument();
    expect(postItem).toHaveTextContent(store.getState().profilePage.posts[0].message);
  });

  it('at first textarea shouldn`t have a value, and have after change event', async () => {
    const {getByTestId} = createTestables({});

    const textarea = getByTestId('NewPost.Input');

    expect(textarea).toBeInTheDocument();
    expect(textarea).not.toHaveValue();

    fireEvent.change(textarea, {target: {value: textareaValue}});
    expect(textarea).toHaveValue(textareaValue);
  });

  it('amount of posts should be incremented', async () => {
    const {getByTestId, findByTestId} = createTestables({});

    const textarea = getByTestId('NewPost.Input');

    fireEvent.change(textarea, {target: {value: textareaValue}});
    expect(textarea).toHaveValue(textareaValue);

    const submitButton = getByTestId('NewPost.Submit');

    fireEvent.click(submitButton);

    const newPost = await findByTestId('NewPost.Message.5');

    expect(newPost).toBeInTheDocument();
  });
});
