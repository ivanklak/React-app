import {IThunkResult} from '../../types';
import {profileAPI, ResultCodes} from '../../api';

import {ProfileAction, ProfileActions} from './actions';

export const getUserProfile =
  (userId: number): IThunkResult<Promise<void>, ProfileAction> =>
  async dispatch => {
    const response = await profileAPI.getProfile(userId);

    dispatch(ProfileActions.setUserProfile(response));
  };

export const getStatus =
  (userId: number): IThunkResult<Promise<void>, ProfileAction> =>
  async dispatch => {
    const response = await profileAPI.getStatus(userId);

    dispatch(ProfileActions.setStatus(response));
  };

export const updateStatus =
  (status: string): IThunkResult<Promise<void>, ProfileAction> =>
  async dispatch => {
    const response = await profileAPI.updateStatus(status);

    if (response.resultCode === ResultCodes.Success) {
      dispatch(ProfileActions.setStatus(status));
    }
  };

export const addNewPost =
  (newPostText: string): IThunkResult<void, ProfileAction> =>
  dispatch => {
    dispatch(ProfileActions.addPost(newPostText));
  };
