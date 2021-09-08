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
interface ILoginResponse {
  data: ILoginResponseData;
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
    return instance.delete(`auth/login`);
  },
};
