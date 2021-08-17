import {getAuthUserData} from '../Authentication/auth-reducer';

import {IThunkResult} from '../../types';

import {AppAction, AppActions, AppActionTypes} from './actions';

interface IState {
  initialized: boolean;
}

const initialState: IState = {
  initialized: false,
};

const appReducer = (state = initialState, action: AppAction): IState => {
  switch (action.type) {
    case AppActionTypes.INITIALIZED_SUCCESS:
      return {
        initialized: true,
      };

    default:
      return state;
  }
};

export const initializeApp = (): IThunkResult<void, AppAction> => dispatch => {
  const promise = dispatch(getAuthUserData());

  Promise.all([promise]).then(() => {
    dispatch(AppActions.initializedSuccess());
  });
};

export default appReducer;
