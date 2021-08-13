import {ThunkAction} from 'redux-thunk';

import {getAuthUserData} from '../Authentication/auth-reducer';
import {AppStateType} from '../redux-store';

import * as fromActions from './actions';

export interface IState {
  initialized: boolean;
}

const initialState: IState = {
  initialized: false,
};

const appReducer = (state = initialState, action: fromActions.Actions): IState => {
  switch (action.type) {
    case fromActions.ActionTypes.INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

type IThunk = ThunkAction<Promise<void>, AppStateType, unknown, fromActions.Actions>;

export const initializeApp = (): IThunk => async dispatch => {
  const promise = dispatch(getAuthUserData());

  Promise.all([promise]).then(() => {
    dispatch(fromActions.Actions.initializedSuccess());
  });
};

export default appReducer;
