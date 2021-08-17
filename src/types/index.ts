import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';

import {AppStateType} from '../Redux/redux-store';

export interface IMessages {
  id: number;
  message: string;
}

export interface IDialogs {
  id: number;
  name: string;
}

export interface IMessageValues {
  newMessageBody: string;
}

export interface ILoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface IPostValues {
  newPostText: string;
}

export interface IPost {
  id: number;
  message: string;
  likesCount: number;
}

export interface IContacts {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
}

export interface IPhotos {
  small: string | null;
  large: string | null;
}

export interface IProfile {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: IContacts;
  photos: IPhotos;
}

export interface IUser {
  id: number;
  name: string;
  status: string;
  photos: IPhotos;
  followed: boolean;
}

export interface IAuthenticationsData {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
}

type FunctionType = (...args: any[]) => void;
type ActionCreatorsMapObject = {[actionCreator: string]: FunctionType};

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;

export type IThunkResult<R, A extends Action> = ThunkAction<R, AppStateType, unknown, A>;
