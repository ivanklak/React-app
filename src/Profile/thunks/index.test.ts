import {profileAPI} from '../services';
import {ProfileActions} from '../actions';
import {addNewPost, getStatus, getUserProfile, updateStatus} from '../thunks';
import {mockDefaultResponse, mockProfileResponse} from '../helpers/tests';

const defaultResponse = mockDefaultResponse();
const profileResponse = mockProfileResponse();
const failureResponse = {message: 'some error'};
const statusResponse = '#dogecoin';
const newMessage = 'ethereum';
const userId = 999;

describe('profile thunks', () => {
  let mockedGetProfile: jest.SpyInstance;
  let mockedGetStatus: jest.SpyInstance;
  let mockedUpdateStatus: jest.SpyInstance;

  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();
  const extraArgumentMock = jest.fn();

  beforeEach(() => {
    mockedGetProfile = jest.spyOn(profileAPI, 'getProfile');
    mockedGetStatus = jest.spyOn(profileAPI, 'getStatus');
    mockedUpdateStatus = jest.spyOn(profileAPI, 'updateStatus');
  });

  afterEach(() => {
    jest.clearAllMocks();
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

    const thunk = updateStatus(newMessage);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith(ProfileActions.getStatusSuccess(newMessage));
  });

  it('failure updateStatus thunk', async () => {
    mockedUpdateStatus.mockReturnValue(Promise.reject(failureResponse));

    const thunk = updateStatus(newMessage);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith(ProfileActions.getStatusFailure(failureResponse.message));
  });

  it('addPost thunk', async () => {
    const thunk = addNewPost(newMessage);

    await thunk(dispatchMock, getStateMock, extraArgumentMock);

    expect(dispatchMock).toBeCalledTimes(1);
    expect(dispatchMock).toBeCalledWith(ProfileActions.addPost(newMessage));
  });
});
