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

type FunctionType = (...args: any[]) => any;
type ActionCreatorsMapObject = {[actionCreator: string]: FunctionType};

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;
