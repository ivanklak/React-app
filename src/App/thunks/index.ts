import {IThunkResult} from '../types';
import {getAuthUserData} from '../../Authentication/thunks';

import {AppAction, AppActions} from '../actions';

export const initializeApp = (): IThunkResult<void, AppAction> => dispatch => {
  const promise = dispatch(getAuthUserData());

  Promise.all([promise]).then(() => {
    dispatch(AppActions.initializedSuccess());
  });
};
