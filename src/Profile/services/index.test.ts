import {profileAPI} from '../services';
import {mockDefaultResponse, mockProfileResponse} from '../helpers/tests';

const defaultResponse = mockDefaultResponse();
const profileResponse = mockProfileResponse();
const statusResponse = '#bitcoin';
const newStatus = '#dogecoin';
const userId = 999;

describe('profileAPI', () => {
  let mockedGetProfile: jest.SpyInstance;
  let mockedGetStatus: jest.SpyInstance;
  let mockedUpdateStatus: jest.SpyInstance;

  beforeAll(() => {
    mockedGetProfile = jest.spyOn(profileAPI, 'getProfile');
    mockedGetStatus = jest.spyOn(profileAPI, 'getStatus');
    mockedUpdateStatus = jest.spyOn(profileAPI, 'updateStatus');
  });

  it('return profile from backend', async () => {
    mockedGetProfile.mockReturnValue(Promise.resolve(profileResponse));

    const data = await profileAPI.getProfile(userId);

    expect(data).toEqual(profileResponse);
  });

  it('return status from backend', async () => {
    mockedGetStatus.mockReturnValue(Promise.resolve(statusResponse));

    const data = await profileAPI.getStatus(userId);

    expect(data).toEqual(statusResponse);
  });

  it('update status', async () => {
    mockedUpdateStatus.mockReturnValue(Promise.resolve(defaultResponse));

    const data = await profileAPI.updateStatus(newStatus);

    expect(data).toEqual(defaultResponse);
    expect(data.resultCode).toBe(defaultResponse.resultCode);
  });
});
