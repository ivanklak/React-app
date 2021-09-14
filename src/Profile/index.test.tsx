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

let profileResponse: IProfile;
let statusResponse: string;
let authData: IAuthenticationsData;

const createTestables = (props: Partial<any>) => {
  const renderResult = render(
    <BrowserRouter>
      <Provider store={store}>
        <Profile {...props} />
      </Provider>
    </BrowserRouter>,
  );

  return {...renderResult, store};
};

describe('Profile Component', () => {
  let mockedGetProfile: jest.SpyInstance;
  let mockedGetStatus: jest.SpyInstance;
  const dispatch = store.dispatch;

  beforeEach(() => {
    mockedGetProfile = jest.spyOn(profileAPI, 'getProfile');
    mockedGetStatus = jest.spyOn(profileAPI, 'getStatus');
    store.dispatch = jest.fn(dispatch);
    profileResponse = {
      userId: 9208,
      lookingForAJob: false,
      lookingForAJobDescription: 'React',
      fullName: 'ivanklak',
      contacts: null,
      photos: {small: null, large: null},
    };
    statusResponse = '#bitcoin';
    authData = {
      userId: 9208,
      email: 'ivanklak17@gmail.com',
      login: 'ivanklak',
      isAuth: true,
    };
    store.dispatch(AuthenticationActions.getAuthUserDataSuccess(authData));
  });

  const authAction = AuthenticationActions.getAuthUserDataSuccess(authData);

  it('should be rendered', async () => {
    mockedGetProfile.mockReturnValue(Promise.resolve(profileResponse));
    mockedGetStatus.mockReturnValue(Promise.resolve(statusResponse));

    const {store} = createTestables({});

    expect(store.dispatch).toBeCalledWith({...authAction, payload: authData});
    expect(mockedGetProfile).toBeCalledTimes(1);
    expect(mockedGetStatus).toBeCalledTimes(1);
    await expect(mockedGetProfile).toBeCalledWith(profileResponse.userId);
    await expect(mockedGetStatus).toBeCalledWith(profileResponse.userId);
  });

  it('clicking on the status opens the edit mode', async () => {
    mockedGetProfile.mockReturnValue(Promise.resolve(profileResponse));
    mockedGetStatus.mockReturnValue(Promise.resolve(statusResponse));

    const {getByTestId} = createTestables({});

    await expect(mockedGetProfile).toBeCalledWith(profileResponse.userId);
    await expect(mockedGetStatus).toBeCalledWith(profileResponse.userId);

    const defaultStatus = getByTestId('DefaultStatus.Text');

    expect(defaultStatus).toBeInTheDocument();
    expect(defaultStatus).toHaveTextContent(statusResponse);

    fireEvent.doubleClick(defaultStatus);

    const editStatus = getByTestId('NewStatus.Input');

    expect(editStatus).toBeInTheDocument();
    expect(editStatus).toHaveValue(statusResponse);
  });

  it('my posts should be displayed', async () => {
    mockedGetProfile.mockReturnValue(Promise.resolve(profileResponse));

    const {getByTestId} = createTestables({});

    await expect(mockedGetProfile).toBeCalledWith(profileResponse.userId);

    const myPosts = getByTestId('MyPosts.Title');

    expect(myPosts).toBeInTheDocument();

    const postItem = getByTestId('NewPost.Message.1');

    expect(postItem).toBeInTheDocument();
    expect(postItem).toHaveTextContent(store.getState().profilePage.posts[0].message);
  });

  it('at first textarea shouldn`t have a value, and have after change event', async () => {
    mockedGetProfile.mockReturnValue(Promise.resolve(profileResponse));
    const textareaValue = 'This is my third post';

    const {getByTestId} = createTestables({});

    await expect(mockedGetProfile).toBeCalledWith(profileResponse.userId);

    const textarea = getByTestId('NewPost.Input');

    expect(textarea).toBeInTheDocument();
    expect(textarea).not.toHaveValue();

    fireEvent.change(textarea, {target: {value: textareaValue}});
    expect(textarea).toHaveValue(textareaValue);
  });

  it('amount of posts should be incremented', async () => {
    mockedGetProfile.mockReturnValue(Promise.resolve(profileResponse));
    const textareaValue = 'This is my third post';

    const {getByTestId, getAllByTestId} = createTestables({});

    await expect(mockedGetProfile).toBeCalledWith(profileResponse.userId);

    const textarea = getByTestId('NewPost.Input');

    fireEvent.change(textarea, {target: {value: textareaValue}});
    expect(textarea).toHaveValue(textareaValue);

    const submitButton = getByTestId('NewPost.Submit');

    fireEvent.click(submitButton);

    setTimeout(() => {
      const listItems = getAllByTestId(/NewPost.Message/i);

      expect(listItems).toHaveLength(3);
    }, 0);
  });
});
