import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import '../matchMedia';
import store from '../App/redux-store';
import {AuthenticationActions} from '../Authentication/actions';
import {IAuthenticationState} from '../Authentication/reducers';

import {profileAPI} from './services';
import {IProfile} from './types';

import Profile from './index';

let profileResponse: IProfile;
let statusResponse: string;
let authData: IAuthenticationState;

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
  });

  const authAction = AuthenticationActions.setAuthUserData(authData);

  it('should be rendered', async () => {
    mockedGetProfile.mockReturnValue(Promise.resolve(profileResponse));
    mockedGetStatus.mockReturnValue(Promise.resolve(statusResponse));

    const {store} = createTestables({});

    store.dispatch(AuthenticationActions.setAuthUserData(authData));
    expect(store.dispatch).toBeCalledWith({...authAction, payload: authData});

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(mockedGetProfile).toBeCalledTimes(1);
    expect(mockedGetStatus).toBeCalledTimes(1);
    expect(mockedGetProfile).toBeCalledWith(profileResponse.userId);
    expect(mockedGetStatus).toBeCalledWith(profileResponse.userId);
  });
});
