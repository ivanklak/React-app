export interface IAuthenticationsData {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
}

export interface ILoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}
