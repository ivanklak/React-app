import axios from 'axios';

import {ProfileType, UserType} from '../types/types';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '2e993b56-c8b6-4744-b277-c9b4cada2532',
  },
});

export enum ResultCodeEnum {
  Succes = 0,
  Error = 1,
}

type ResponseType<D = Record<string, never>, RC = ResultCodeEnum> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
};
type MeResponseDataType = {
  id: number;
  email: string;
  login: string;
};

type LoginResponseDataType = {
  userId: number;
};

type GetItemsType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 100) {
    return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
  },

  toFollow(userId: number) {
    return instance.post<ResponseType>(`follow/${userId}`).then(response => response.data);
  },

  toUnfollow(userId: number) {
    return instance.delete<ResponseType>(`follow/${userId}`).then(response => response.data);
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
    return instance.put<ResponseType>(`profile/status`, {status: status}).then(res => res.data);
  },
};

export const authAPI = {
  me() {
    return instance.get<ResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data);
  },

  login(email: string, password: string, rememberMe = false) {
    return instance.post<ResponseType<LoginResponseDataType>>(`auth/login`, {email, password, rememberMe}).then(res => res.data);
  },

  logout() {
    return instance.delete(`auth/login`);
  },
};
