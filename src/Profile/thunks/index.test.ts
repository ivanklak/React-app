import {profileAPI} from '../services';
import {IProfile} from '../types';
import {ProfileActions} from '../actions';

import {getUserProfile} from './index';

describe('profile thunks', () => {
  let mockedGetProfile: jest.SpyInstance;
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  const extraArgumentMock = jest.fn();

  beforeEach(() => {
    mockedGetProfile = jest.spyOn(profileAPI, 'getProfile');
    dispatchMock.mockClear();
    getStateMock.mockClear();
    extraArgumentMock.mockClear();
  });

  const profileResponse: IProfile = {
    userId: 9208,
    lookingForAJob: false,
    lookingForAJobDescription: 'React',
    fullName: 'ivanklak',
    contacts: null,
    photos: {small: null, large: null},
  };

  const failureResponse = {message: 'some error'};

  it('success getUserProfile thunk', async () => {
    mockedGetProfile.mockReturnValue(Promise.resolve(profileResponse));

    const thunk = getUserProfile(profileResponse.userId);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);

    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, ProfileActions.getUserProfileRequest());
    expect(dispatchMock).toHaveBeenNthCalledWith(2, ProfileActions.getUserProfileSuccess(profileResponse));
  });

  it('failure getUserProfile thunk', async () => {
    mockedGetProfile.mockReturnValue(Promise.reject(failureResponse));

    const thunk = getUserProfile(profileResponse.userId);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);

    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, ProfileActions.getUserProfileRequest());
    expect(dispatchMock).toHaveBeenNthCalledWith(2, ProfileActions.getUserProfileFailure(failureResponse.message));
  });
});
