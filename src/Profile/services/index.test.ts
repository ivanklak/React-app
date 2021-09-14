import {IDefaultResponse} from '../../Users/services';
import {ResultCodes} from '../../App/services/api';
import {IProfile} from '../types';

import {profileAPI} from './index';

let defaultResponse: IDefaultResponse;
let profileResponse: IProfile;
let statusResponse: string;

describe('profileAPI', () => {
  let mockedGetProfile: jest.SpyInstance;
  let mockedGetStatus: jest.SpyInstance;
  let mockedUpdateStatus: jest.SpyInstance;

  beforeEach(() => {
    mockedGetProfile = jest.spyOn(profileAPI, 'getProfile');
    mockedGetStatus = jest.spyOn(profileAPI, 'getStatus');
    mockedUpdateStatus = jest.spyOn(profileAPI, 'updateStatus');
    defaultResponse = {
      data: {},
      messages: [],
      resultCode: ResultCodes.Success,
    };
    statusResponse = '#bitcoin';
    profileResponse = {
      userId: 9208,
      lookingForAJob: false,
      lookingForAJobDescription: 'Nein',
      fullName: 'ivanklak',
      contacts: null,
      photos: {small: null, large: null},
    };
  });

  it('return profile from backend', async () => {
    const userId = 9208;

    mockedGetProfile.mockReturnValue(Promise.resolve(profileResponse));

    const data = await profileAPI.getProfile(userId);

    expect(data).toEqual(profileResponse);
  });

  it('return status from backend', async () => {
    const userId = 9208;

    mockedGetStatus.mockReturnValue(Promise.resolve(statusResponse));

    const data = await profileAPI.getStatus(userId);

    expect(data).toEqual(statusResponse);
  });

  it('update status', async () => {
    const newStatus = '#dogecoin';

    mockedUpdateStatus.mockReturnValue(Promise.resolve(defaultResponse));

    const data = await profileAPI.updateStatus(newStatus);

    expect(data).toEqual(defaultResponse);
    expect(data.resultCode).toBe(defaultResponse.resultCode);
  });
});
