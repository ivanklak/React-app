import {IDefaultResponse, profileAPI} from '../services';
import {IProfile} from '../types';
import {ProfileActions} from '../actions';
import {ResultCodes} from '../../App/services/api';

import {addNewPost, getStatus, getUserProfile, updateStatus} from './index';

describe('profile thunks', () => {
  let mockedGetProfile: jest.SpyInstance;
  let mockedGetStatus: jest.SpyInstance;
  let mockedUpdateStatus: jest.SpyInstance;

  let userId: number;
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  const extraArgumentMock = jest.fn();
  const defaultResponse: IDefaultResponse = {
    data: {},
    messages: [],
    resultCode: ResultCodes.Success,
  };
  const profileResponse: IProfile = {
    userId: 9208,
    lookingForAJob: false,
    lookingForAJobDescription: 'React',
    fullName: 'ivanklak',
    contacts: null,
    photos: {small: null, large: null},
  };
  const statusResponse = '#dogecoin';
  const updatedStatus = '#ethereum';
  const failureResponse = {message: 'some error'};
  const newPostText = 'HI dudes!';

  beforeEach(() => {
    mockedGetProfile = jest.spyOn(profileAPI, 'getProfile');
    mockedGetStatus = jest.spyOn(profileAPI, 'getStatus');
    mockedUpdateStatus = jest.spyOn(profileAPI, 'updateStatus');
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

  it('success updateStatus thunk', async () => {
    mockedUpdateStatus.mockReturnValue(Promise.resolve(defaultResponse));

    const thunk = updateStatus(updatedStatus);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith(ProfileActions.getStatusSuccess(updatedStatus));
  });

  it('failure updateStatus thunk', async () => {
    mockedUpdateStatus.mockReturnValue(Promise.reject(failureResponse));

    const thunk = updateStatus(updatedStatus);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith(ProfileActions.getStatusFailure(failureResponse.message));
  });

  it('addPost thunk', async () => {
    const thunk = addNewPost(newPostText);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith(ProfileActions.addPost(newPostText));
  });
});
