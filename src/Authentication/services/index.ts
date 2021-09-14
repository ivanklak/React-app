import {instance, ResultCodes} from '../../App/services/api';

interface IMeResponseData {
  id: number;
  email: string;
  login: string;
}
export interface IMeResponse {
  data: IMeResponseData;
  messages: Array<string>;
  resultCode: ResultCodes;
}

interface ILoginResponseData {
  userId: number;
}
export interface ILoginResponse {
  data: ILoginResponseData;
  messages: Array<string>;
  resultCode: ResultCodes;
}

type EmptyObject = Record<string, never>;
export interface IDefaultResponse {
  data: EmptyObject;
  messages: Array<string>;
  resultCode: ResultCodes;
}

export const authAPI = {
  me() {
    return instance.get<IMeResponse>(`auth/me`).then(res => res.data);
  },

  login(email: string, password: string, rememberMe = false) {
    return instance.post<ILoginResponse>(`auth/login`, {email, password, rememberMe}).then(res => res.data);
  },

  logout() {
    return instance.delete<IDefaultResponse>(`auth/login`).then(res => res.data);
  },
};
