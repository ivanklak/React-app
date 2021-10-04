import React from 'react';
// @ts-ignore TypeScript definitions missing wait
import {fireEvent, render, wait} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import '../matchMedia';
import Profile from '../Profile';
import {IAuthenticationsData} from '../Authentication/types';
import {AuthenticationActions} from '../Authentication/actions';
import {createStore} from '../App/helpers/test';

import {profileAPI} from './services';
import {mockProfileResponse} from './helpers/tests';

const profileResponse = mockProfileResponse();
const statusResponse = '#bitcoin';
const authData: IAuthenticationsData = {
  userId: 999,
  email: 'test@gmail.com',
  login: 'testLogin',
  isAuth: true,
};
const textareaValue = 'This is my third post';

const createTestables = () => {
  const store = createStore();
  const renderResult = render(
    <BrowserRouter>
      <Provider store={store}>
        <Profile />
      </Provider>
    </BrowserRouter>,
  );

  return {...renderResult, store};
};

describe('Profile Component', () => {
  let mockedGetProfile: jest.SpyInstance;
  let mockedGetStatus: jest.SpyInstance;

  beforeEach(() => {
    mockedGetProfile = jest.spyOn(profileAPI, 'getProfile');
    mockedGetStatus = jest.spyOn(profileAPI, 'getStatus');
    mockedGetProfile.mockReturnValue(Promise.resolve(profileResponse));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be rendered', async () => {
    mockedGetStatus.mockReturnValue(Promise.resolve(statusResponse));

    const {store} = createTestables();

    store.dispatch(AuthenticationActions.getAuthUserDataSuccess(authData));

    await wait(() => expect(mockedGetProfile).toBeCalledTimes(1));
    expect(mockedGetStatus).toBeCalledTimes(1);
    expect(mockedGetProfile).toBeCalledWith(profileResponse.userId);
    expect(mockedGetStatus).toBeCalledWith(profileResponse.userId);
  });

  it('clicking on the status opens the edit mode', async () => {
    mockedGetStatus.mockReturnValue(Promise.resolve(statusResponse));

    const {getByTestId, store} = createTestables();

    store.dispatch(AuthenticationActions.getAuthUserDataSuccess(authData));

    await wait(() => expect(mockedGetStatus).toBeCalledTimes(1));
    expect(mockedGetStatus).toBeCalledWith(profileResponse.userId);

    const defaultStatus = getByTestId('DefaultStatus.Text');

    expect(defaultStatus).toBeInTheDocument();
    expect(defaultStatus).toHaveTextContent(statusResponse);

    fireEvent.doubleClick(defaultStatus);

    const editStatus = getByTestId('NewStatus.Input');

    expect(editStatus).toBeInTheDocument();
    expect(editStatus).toHaveValue(statusResponse);
  });

  it('my posts should be displayed', () => {
    const {getByTestId} = createTestables();

    const myPosts = getByTestId('MyPosts.Title');

    expect(myPosts).toBeInTheDocument();

    const postItem = getByTestId('NewPost.Message.1');

    expect(postItem).toBeInTheDocument();
    expect(postItem).toHaveTextContent(/hi, how are you/i);
  });

  it('at first textarea shouldn`t have a value, and have after change event', () => {
    const {getByTestId} = createTestables();

    const textarea = getByTestId('NewPost.Input');

    expect(textarea).toBeInTheDocument();
    expect(textarea).not.toHaveValue();

    fireEvent.change(textarea, {target: {value: textareaValue}});
    expect(textarea).toHaveValue(textareaValue);
  });

  it('amount of posts should be incremented', async () => {
    const {getByTestId, findByTestId} = createTestables();

    const textarea = getByTestId('NewPost.Input');

    fireEvent.change(textarea, {target: {value: textareaValue}});
    expect(textarea).toHaveValue(textareaValue);

    const submitButton = getByTestId('NewPost.Submit');

    fireEvent.click(submitButton);

    const newPost = await findByTestId('NewPost.Message.3');

    expect(newPost).toBeInTheDocument();
  });
});
