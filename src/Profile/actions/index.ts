import {ActionsUnion} from '../../App/types';
import {createAction} from '../../App/actions/helpers';
import {IProfile} from '../types';

export enum ProfileActionTypes {
  ADD_POST = 'PROFILE/ADD_POST',
  SET_USER_PROFILE = 'PROFILE/SET_USER_PROFILE',
  SET_STATUS = 'PROFILE/SET_STATUS',
  DELETE_POST = 'PROFILE/DELETE_POST',
}

export const ProfileActions = {
  setUserProfile: (payload: IProfile) => createAction(ProfileActionTypes.SET_USER_PROFILE, payload),
  setStatus: (payload: string) => createAction(ProfileActionTypes.SET_STATUS, payload),
  addPost: (payload: string) => createAction(ProfileActionTypes.ADD_POST, payload),
  deletePost: (payload: number) => createAction(ProfileActionTypes.DELETE_POST, payload),
};

export type ProfileAction = ActionsUnion<typeof ProfileActions>;
