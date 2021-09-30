import {AppActions} from '../actions';
import appReducer, {initialState} from '../reducers';

const state = initialState;

describe('appReducer', () => {
  it('initialized success', () => {
    const newState = appReducer(state, AppActions.initializedSuccess());

    expect(state.initialized).toBeFalsy();
    expect(newState.initialized).toBeTruthy();
  });
});
