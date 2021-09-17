import store from '../../App/redux-store';

import {AuthenticationActions} from '../actions';
import {IAuthenticationsData} from '../types';

import authReducer from './index';

const authData: IAuthenticationsData = {
  userId: 9208,
  email: 'ivanklak17@gmail.com',
  login: 'ivanklak',
  isAuth: true,
};
const errorMessage = 'some error';
const state = store.getState().auth;

describe('authReducer', () => {
  it('get users data request', () => {
    const newState = authReducer(state, AuthenticationActions.getAuthUserDataRequest());

    expect(newState.isLoading).toBeTruthy();
  });

  it('get users data success', () => {
    const newState = authReducer(state, AuthenticationActions.getAuthUserDataSuccess(authData));

    expect(newState.userId).toBe(authData.userId);
    expect(newState.isLoading).toBeFalsy();
  });

  it('get users data failure', () => {
    const newState = authReducer(state, AuthenticationActions.getAuthUserDataFailure(errorMessage));

    expect(newState.error).toBe(errorMessage);
    expect(newState.userId).toBeNull();
  });
});
