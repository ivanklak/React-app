import {ProfileActions} from '../actions';
import profileReducer, {initialState} from '../reducers';
import {mockProfileResponse} from '../helpers/tests';

const profileResponse = mockProfileResponse();
const failureResponse = 'Some error';
const newMessage = 'bitcoin';
const state = initialState;

describe('profileReducer', () => {
  it('request action should be invoked', () => {
    const newState = profileReducer(state, ProfileActions.getUserProfileRequest());

    expect(state.isLoading).toBeFalsy();
    expect(newState.isLoading).toBeTruthy();
  });

  it('get profile success', () => {
    const newState = profileReducer(state, ProfileActions.getUserProfileSuccess(profileResponse));

    expect(state.profile).toBeNull();
    expect(newState.profile).toEqual(profileResponse);
  });

  it('get profile failure', () => {
    const newState = profileReducer(state, ProfileActions.getUserProfileFailure(failureResponse));

    expect(state.error).toBeNull();
    expect(newState.error).toBe(failureResponse);
  });

  it('get status success', () => {
    const newState = profileReducer(state, ProfileActions.getStatusSuccess(newMessage));

    expect(state.status).toEqual('');
    expect(newState.status).toBe(newMessage);
  });

  it('get status failure', () => {
    const newState = profileReducer(state, ProfileActions.getStatusFailure(failureResponse));

    expect(state.error).toBeNull();
    expect(newState.error).toBe(failureResponse);
  });

  it('add post', () => {
    const newState = profileReducer(state, ProfileActions.addPost(newMessage));

    expect(state.posts.length).toBe(2);

    expect(newState.posts.length).toBe(3);
    expect(newState.posts[2].message).toBe(newMessage);
    expect(newState.posts[2].id).toBe(3);
  });

  it('delete post', () => {
    const newState = profileReducer(state, ProfileActions.deletePost(1));

    expect(state.posts.length).toBe(2);

    expect(newState.posts.length).toBe(1);
    expect(newState.posts[0].id).not.toBe(1);
  });
});
