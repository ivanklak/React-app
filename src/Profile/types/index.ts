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
  contacts: IContacts | null;
  photos: IPhotos;
}
