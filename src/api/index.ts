import axios from 'axios';

import {ProfileType, UserType} from '../types/types';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '2e993b56-c8b6-4744-b277-c9b4cada2532',
  },
});

export enum ResultCodes {
  Success = 0,
  Error = 1,
}

interface IGetItems {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
}

type EmptyObject = Record<string, never>;
interface IDefaultResponse {
  data: EmptyObject;
  messages: Array<string>;
  resultCode: ResultCodes;
}

interface IMeResponseData {
  id: number;
  email: string;
  login: string;
}
interface IMeResponse {
  data: IMeResponseData;
  messages: Array<string>;
  resultCode: ResultCodes;
}

interface ILoginResponseData {
  userId: number;
}
interface ILoginResponse {
  data: ILoginResponseData;
  messages: Array<string>;
  resultCode: ResultCodes;
}

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 100) {
    return instance.get<IGetItems>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
  },

  toFollow(userId: number) {
    return instance.post<IDefaultResponse>(`follow/${userId}`).then(response => response.data);
  },

  toUnfollow(userId: number) {
    return instance.delete<IDefaultResponse>(`follow/${userId}`).then(response => response.data);
  },
};

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<ProfileType>(`profile/` + userId).then(res => res.data);
  },

  getStatus(userId: number) {
    return instance.get<string>(`profile/status/` + userId).then(res => res.data);
  },

  updateStatus(status: string) {
    return instance.put<IDefaultResponse>(`profile/status`, {status: status}).then(res => res.data);
  },
};

export const authAPI = {
  me() {
    return instance.get<IMeResponse>(`auth/me`).then(res => res.data);
  },

  login(email: string, password: string, rememberMe = false) {
    return instance.post<ILoginResponse>(`auth/login`, {email, password, rememberMe}).then(res => res.data);
  },

  logout() {
    return instance.delete(`auth/login`);
  },
};
