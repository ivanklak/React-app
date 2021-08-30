import {IUser} from '../types';
import {instance, ResultCodes} from '../../App/services/api';

interface IGetItems {
  items: Array<IUser>;
  totalCount: number;
  error: string | null;
}

type EmptyObject = Record<string, never>;
interface IDefaultResponse {
  data: EmptyObject;
  messages: Array<string>;
  resultCode: ResultCodes;
}

export const usersAPI = {
  getUsers(currentPage: number, pageSize = 100) {
    return instance.get<IGetItems>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
  },

  toFollow(userId: number) {
    return instance.post<IDefaultResponse>(`follow/${userId}`).then(response => response.data);
  },

  toUnfollow(userId: number) {
    return instance.delete<IDefaultResponse>(`follow/${userId}`).then(response => response.data);
  },
};
