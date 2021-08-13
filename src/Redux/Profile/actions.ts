import {ActionsUnion, ProfileType} from '../../types/types';

import {createAction} from '../action-helper';

export enum ActionTypes {
  ADD_POST = 'profile/ADD_POST',
  SET_USER_PROFILE = 'profile/SET_USER_PROFILE',
  SET_STATUS = 'profile/SET_STATUS',
  DELETE_POST = 'profile/DELETE_POST',
}

export const Actions = {
  setUserProfile: (profile: ProfileType) => createAction(ActionTypes.SET_USER_PROFILE, profile),
  setStatus: (status: string) => createAction(ActionTypes.SET_STATUS, status),
  addPost: (newPostText: string) => createAction(ActionTypes.ADD_POST, newPostText),
  deletePost: (postId: number) => createAction(ActionTypes.DELETE_POST, postId),
};

export type Actions = ActionsUnion<typeof Actions>;
