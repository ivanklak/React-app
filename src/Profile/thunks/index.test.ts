import {profileAPI} from '../services';
import {IProfile} from '../types';
import {ProfileActions} from '../actions';

import {getStatus, getUserProfile} from './index';

describe('profile thunks', () => {
  let mockedGetProfile: jest.SpyInstance;
  let mockedGetStatus: jest.SpyInstance;
  let userId: number;
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  const extraArgumentMock = jest.fn();
  const profileResponse: IProfile = {
    userId: 9208,
    lookingForAJob: false,
    lookingForAJobDescription: 'React',
    fullName: 'ivanklak',
    contacts: null,
    photos: {small: null, large: null},
  };
  const statusResponse = '#dogecoin';
  const failureResponse = {message: 'some error'};

  beforeEach(() => {
    mockedGetProfile = jest.spyOn(profileAPI, 'getProfile');
    mockedGetStatus = jest.spyOn(profileAPI, 'getStatus');
    dispatchMock.mockClear();
    getStateMock.mockClear();
    extraArgumentMock.mockClear();
    userId = 9208;
  });

  it('success getUserProfile thunk', async () => {
    mockedGetProfile.mockReturnValue(Promise.resolve(profileResponse));

    const thunk = getUserProfile(userId);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);

    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, ProfileActions.getUserProfileRequest());
    expect(dispatchMock).toHaveBeenNthCalledWith(2, ProfileActions.getUserProfileSuccess(profileResponse));
  });

  it('failure getUserProfile thunk', async () => {
    mockedGetProfile.mockReturnValue(Promise.reject(failureResponse));

    const thunk = getUserProfile(userId);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);

    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, ProfileActions.getUserProfileRequest());
    expect(dispatchMock).toHaveBeenNthCalledWith(2, ProfileActions.getUserProfileFailure(failureResponse.message));
  });

  it('success getStatus thunk', async () => {
    mockedGetStatus.mockReturnValue(Promise.resolve(statusResponse));

    const thunk = getStatus(userId);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);

    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, ProfileActions.getStatusRequest());
    expect(dispatchMock).toHaveBeenNthCalledWith(2, ProfileActions.getStatusSuccess(statusResponse));
  });

  it('failure getStatus thunk', async () => {
    mockedGetStatus.mockReturnValue(Promise.reject(failureResponse));

    const thunk = getStatus(userId);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);

    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, ProfileActions.getStatusRequest());
    expect(dispatchMock).toHaveBeenNthCalledWith(2, ProfileActions.getStatusFailure(failureResponse.message));
  });
});
