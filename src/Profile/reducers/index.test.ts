import {ProfileActions} from '../actions';
import {IProfile} from '../types';

import store from '../../App/redux-store';

import profileReducer, {IProfileState} from './index';

const profileResponse: IProfile = {
  userId: 9208,
  lookingForAJob: false,
  lookingForAJobDescription: 'React',
  fullName: 'ivanklak',
  contacts: null,
  photos: {small: null, large: null},
};

const failureResponse = 'Some error';

describe('profileReducer', () => {
  let state: IProfileState;

  beforeEach(() => {
    state = store.getState().profilePage;
  });

  it('request action should be invoked', () => {
    const newState = profileReducer(state, ProfileActions.getUserProfileRequest());

    expect(newState.isLoading).toBeTruthy();
  });

  it('get profile success', () => {
    const newState = profileReducer(state, ProfileActions.getUserProfileSuccess(profileResponse));

    expect(newState.profile).toEqual(profileResponse);
  });

  it('get profile failure', () => {
    const newState = profileReducer(state, ProfileActions.getUserProfileFailure(failureResponse));

    expect(newState.error).toBe(failureResponse);
  });

  it('get status success', () => {
    const newStatus = '#bitcoin';
    const newState = profileReducer(state, ProfileActions.getStatusSuccess(newStatus));

    expect(newState.status).toBe(newStatus);
  });

  it('get status failure', () => {
    const error = 'some error';
    const newState = profileReducer(state, ProfileActions.getStatusFailure(error));

    expect(newState.error).toBe(error);
  });

  it('add post', () => {
    const newPostMessage = 'Hi, dudes';
    const newState = profileReducer(state, ProfileActions.addPost(newPostMessage));

    expect(newState.posts[2].message).toBe(newPostMessage);
  });

  it('delete post', () => {
    const newState = profileReducer(state, ProfileActions.deletePost(1));

    expect(newState.posts[0].id).not.toBe(1);
  });
});
