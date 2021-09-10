import {ActionsUnion} from '../../App/types';
import {createAction} from '../../App/actions/helpers';
import {IProfile} from '../types';

export enum ProfileActionTypes {
  ADD_POST = 'PROFILE/ADD_POST',
  GET_USER_PROFILE_REQUEST = 'PROFILE/GET_USER_PROFILE_REQUEST',
  GET_USER_PROFILE_SUCCESS = 'PROFILE/GET_USER_PROFILE_SUCCESS',
  GET_USER_PROFILE_FAILURE = 'PROFILE/GET_USER_PROFILE_FAILURE',
  SET_STATUS_REQUEST = 'PROFILE/SET_STATUS_REQUEST',
  SET_STATUS_SUCCESS = 'PROFILE/SET_STATUS_SUCCESS',
  SET_STATUS_FAILURE = 'PROFILE/SET_STATUS_FAILURE',
  DELETE_POST = 'PROFILE/DELETE_POST',
}

export const ProfileActions = {
  getUserProfileRequest: () => createAction(ProfileActionTypes.GET_USER_PROFILE_REQUEST),
  getUserProfileSuccess: (payload: IProfile) => createAction(ProfileActionTypes.GET_USER_PROFILE_SUCCESS, payload),
  getUserProfileFailure: (payload: string) => createAction(ProfileActionTypes.GET_USER_PROFILE_FAILURE, payload),
  getStatusRequest: () => createAction(ProfileActionTypes.SET_STATUS_REQUEST),
  getStatusSuccess: (payload: string) => createAction(ProfileActionTypes.SET_STATUS_SUCCESS, payload),
  getStatusFailure: (payload: string) => createAction(ProfileActionTypes.SET_STATUS_FAILURE, payload),
  addPost: (payload: string) => createAction(ProfileActionTypes.ADD_POST, payload),
  deletePost: (payload: number) => createAction(ProfileActionTypes.DELETE_POST, payload),
};

export type ProfileAction = ActionsUnion<typeof ProfileActions>;
