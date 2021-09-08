import {AuthenticationAction, AuthenticationActionTypes} from '../actions';

export interface IAuthenticationState {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
}

const initialState: IAuthenticationState = {
  userId: null,
  email: '',
  login: '',
  isAuth: false,
};

const authReducer = (state = initialState, action: AuthenticationAction): IAuthenticationState => {
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
