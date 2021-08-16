import {ThunkAction} from 'redux-thunk';

import {getAuthUserData} from '../Authentication/auth-reducer';
import {AppStateType} from '../redux-store';

import {AppActionTypes, AppActions, AppAction} from './actions';

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
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

type IThunk = ThunkAction<Promise<void>, AppStateType, unknown, AppAction>;

export const initializeApp = (): IThunk => async dispatch => {
  const promise = dispatch(getAuthUserData());

  Promise.all([promise]).then(() => {
    dispatch(AppActions.initializedSuccess());
  });
};

export default appReducer;
