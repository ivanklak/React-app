import {IThunkResult} from '../../App/types';
import {profileAPI} from '../services';

import {ProfileAction, ProfileActions} from '../actions';
import {ResultCodes} from '../../App/services/api';

export const getUserProfile =
  (userId: number): IThunkResult<Promise<void>, ProfileAction> =>
  async dispatch => {
    try {
      dispatch(ProfileActions.getUserProfileRequest());
      const response = await profileAPI.getProfile(userId);

      dispatch(ProfileActions.getUserProfileSuccess(response));
    } catch (error) {
      dispatch(ProfileActions.getUserProfileFailure(error.message));
    }
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
