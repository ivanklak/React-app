import store from '../redux-store';
import {AppActions} from '../actions';

import appReducer from './index';

const state = store.getState().app;

describe('appReducer', () => {
  it('initialized success', () => {
    const newState = appReducer(state, AppActions.initializedSuccess());

    expect(newState.initialized).toBeTruthy();
  });
});
