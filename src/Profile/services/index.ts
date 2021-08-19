import {IProfile} from '../types';
import {instance, ResultCodes} from '../../App/services/api';

type EmptyObject = Record<string, never>;
interface IDefaultResponse {
  data: EmptyObject;
  messages: Array<string>;
  resultCode: ResultCodes;
}

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<IProfile>(`profile/` + userId).then(res => res.data);
  },

  getStatus(userId: number) {
    return instance.get<string>(`profile/status/` + userId).then(res => res.data);
  },

  updateStatus(status: string) {
    return instance.put<IDefaultResponse>(`profile/status`, {status}).then(res => res.data);
  },
};
