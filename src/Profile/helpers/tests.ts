import {ResultCodes} from '../../App/services/api';

import {IProfile} from '../types';
import {IDefaultResponse} from '../services';

export const mockProfileResponse = (overrides: Partial<IProfile> = {}): IProfile => ({
  userId: 999,
  lookingForAJob: false,
  lookingForAJobDescription: 'test',
  fullName: 'testName',
  contacts: null,
  photos: {small: null, large: null},
  ...overrides,
});

export const mockDefaultResponse = (overrides: Partial<IDefaultResponse> = {}): IDefaultResponse => ({
  data: {},
  messages: [],
  resultCode: ResultCodes.Success,
  ...overrides,
});
