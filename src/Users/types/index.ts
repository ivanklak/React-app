export interface IPhotos {
  small: string | null;
  large: string | null;
}

export interface IUser {
  id: number;
  name: string;
  status: string;
  photos: IPhotos;
  followed: boolean;
}
