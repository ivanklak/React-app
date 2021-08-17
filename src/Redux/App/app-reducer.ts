import {getAuthUserData} from '../Authentication/auth-reducer';

import {IThunkResult} from '../../types/types';

import {AppAction, AppActions, AppActionTypes} from './actions';

export interface IState {
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

export const initializeApp = (): IThunkResult<Promise<void>, AppAction> => async dispatch => {
  const promise = dispatch(getAuthUserData());

  Promise.all([promise]).then(() => {
    dispatch(AppActions.initializedSuccess());
  });
};

export default appReducer;
