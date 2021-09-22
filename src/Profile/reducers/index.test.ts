import {ProfileActions} from '../actions';

import store from '../../App/redux-store';

import profileReducer, {IProfileState} from '../reducers';
import {mockProfileResponse} from '../helpers/tests';

const profileResponse = mockProfileResponse();
const failureResponse = 'Some error';
const newMessage = 'bitcoin';

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
    const newState = profileReducer(state, ProfileActions.getStatusSuccess(newMessage));

    expect(newState.status).toBe(newMessage);
  });

  it('get status failure', () => {
    const newState = profileReducer(state, ProfileActions.getStatusFailure(failureResponse));

    expect(newState.error).toBe(failureResponse);
  });

  it('add post', () => {
    const newState = profileReducer(state, ProfileActions.addPost(newMessage));

    expect(newState.posts[2].message).toBe(newMessage);
    expect(newState.posts[2].id).toBe(3);
  });

  it('delete post', () => {
    const newState = profileReducer(state, ProfileActions.deletePost(1));

    expect(newState.posts[0].id).not.toBe(1);
  });
});
