import {ActionsUnion, IProfile} from '../../types/types';

import {createAction} from '../action-helper';

export enum ProfileActionTypes {
  ADD_POST = 'profile/ADD_POST',
  SET_USER_PROFILE = 'profile/SET_USER_PROFILE',
  SET_STATUS = 'profile/SET_STATUS',
  DELETE_POST = 'profile/DELETE_POST',
}

export const ProfileActions = {
  setUserProfile: (payload: IProfile) => createAction(ProfileActionTypes.SET_USER_PROFILE, payload),
  setStatus: (payload: string) => createAction(ProfileActionTypes.SET_STATUS, payload),
  addPost: (payload: string) => createAction(ProfileActionTypes.ADD_POST, payload),
  deletePost: (payload: number) => createAction(ProfileActionTypes.DELETE_POST, payload),
};

export type ProfileAction = ActionsUnion<typeof ProfileActions>;
