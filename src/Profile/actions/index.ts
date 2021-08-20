import {ActionsUnion} from '../../App/types';
import {createAction} from '../../App/actions/helpers';
import {IProfile} from '../types';

export enum ProfileActionTypes {
  ADD_POST = 'PROFILE/ADD_POST',
  GET_USER_PROFILE_REQUEST = 'PROFILE/ GET_USER_PROFILE_REQUEST',
  GET_USER_PROFILE_SUCCESS = 'PROFILE/ GET_USER_PROFILE_SUCCESS',
  GET_USER_PROFILE_FAILURE = 'PROFILE/ GET_USER_PROFILE_FAILURE',
  SET_STATUS = 'PROFILE/SET_STATUS',
  DELETE_POST = 'PROFILE/DELETE_POST',
}

export const ProfileActions = {
  getUserProfileRequest: () => createAction(ProfileActionTypes.GET_USER_PROFILE_REQUEST),
  getUserProfileSuccess: (payload: IProfile) => createAction(ProfileActionTypes.GET_USER_PROFILE_SUCCESS, payload),
  getUserProfileFailure: (payload: IProfile) => createAction(ProfileActionTypes.GET_USER_PROFILE_FAILURE, payload),
  setStatus: (payload: string) => createAction(ProfileActionTypes.SET_STATUS, payload),
  addPost: (payload: string) => createAction(ProfileActionTypes.ADD_POST, payload),
  deletePost: (payload: number) => createAction(ProfileActionTypes.DELETE_POST, payload),
};

export type ProfileAction = ActionsUnion<typeof ProfileActions>;
