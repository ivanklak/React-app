import {IThunkResult} from '../../App/types';
import {profileAPI} from '../services';

import {ProfileAction, ProfileActions} from '../actions';
import {ResultCodes} from '../../App/services/api';

export const getUserProfile =
  (userId: number): IThunkResult<Promise<void>, ProfileAction> =>
  async dispatch => {
    dispatch(ProfileActions.getUserProfileRequest());
    try {
      const response = await profileAPI.getProfile(userId);

      dispatch(ProfileActions.getUserProfileSuccess(response));
    } catch (error) {
      const result = (error as Error).message;

      dispatch(ProfileActions.getUserProfileFailure(result));
    }
  };

export const getStatus =
  (userId: number): IThunkResult<Promise<void>, ProfileAction> =>
  async dispatch => {
    dispatch(ProfileActions.getStatusRequest());
    try {
      const response = await profileAPI.getStatus(userId);

      dispatch(ProfileActions.getStatusSuccess(response));
    } catch (error) {
      const result = (error as Error).message;

      dispatch(ProfileActions.getStatusFailure(result));
    }
  };

export const updateStatus =
  (status: string): IThunkResult<Promise<void>, ProfileAction> =>
  async dispatch => {
    try {
      const response = await profileAPI.updateStatus(status);

      if (response.resultCode === ResultCodes.Success) {
        dispatch(ProfileActions.getStatusSuccess(status));
      }
    } catch (error) {
      const result = (error as Error).message;

      dispatch(ProfileActions.getStatusFailure(result));
    }
  };

export const addNewPost =
  (newPostText: string): IThunkResult<void, ProfileAction> =>
  dispatch => {
    dispatch(ProfileActions.addPost(newPostText));
  };
