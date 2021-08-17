import {AppAction, AppActionTypes} from './actions';

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

export default appReducer;
