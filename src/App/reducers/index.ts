import {AppAction, AppActionTypes} from '../actions';

interface IInitializeState {
  initialized: boolean;
}

export const initialState: IInitializeState = {
  initialized: false,
};

const appReducer = (state = initialState, action: AppAction): IInitializeState => {
  switch (action.type) {
    case AppActionTypes.INITIALIZED_SUCCESS:
      return {
        initialized: true,
      };

    default:
      return state;
  }
};

export default appReducer;
