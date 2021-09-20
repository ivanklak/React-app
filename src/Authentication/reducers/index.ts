import {AuthenticationAction, AuthenticationActionTypes} from '../actions';

export interface IAuthenticationState {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: IAuthenticationState = {
  userId: null,
  email: '',
  login: '',
  isAuth: false,
  isLoading: false,
  error: null,
};

export const authReducer = (state = initialState, action: AuthenticationAction): IAuthenticationState => {
  switch (action.type) {
    case AuthenticationActionTypes.GET_USER_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case AuthenticationActionTypes.GET_USER_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };

    case AuthenticationActionTypes.GET_USER_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
