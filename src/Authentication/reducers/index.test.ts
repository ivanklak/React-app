import store from '../../App/redux-store';

import {AuthenticationActions} from '../actions';
import {IAuthenticationsData} from '../types';

import authReducer from './index';

describe('authReducer', () => {
  let authData: IAuthenticationsData;
  let errorMessage: string;
  const state = store.getState().auth;

  beforeEach(() => {
    authData = {
      userId: 9208,
      email: 'ivanklak17@gmail.com',
      login: 'ivanklak',
      isAuth: true,
    };
    errorMessage = 'some error';
  });

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
