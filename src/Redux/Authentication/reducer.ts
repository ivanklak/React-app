import {AuthenticationAction, AuthenticationActionTypes} from './actions';

interface IState {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
}

const initialState: IState = {
  userId: null,
  email: '',
  login: '',
  isAuth: false,
};

const authReducer = (state = initialState, action: AuthenticationAction): IState => {
  switch (action.type) {
    case AuthenticationActionTypes.SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
