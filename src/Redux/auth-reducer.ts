import { authAPI } from '../api/api';
import { any } from '../../../Library/Caches/typescript/3.6/node_modules/@types/prop-types';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'SET_USER_DATA';

// export type InitialAuthStateType = {
//   userId: number | null;
//   email: string | null;
//   login: string | null;
//   isAuth: boolean;
// };

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
};

export type InitialAuthStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialAuthStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

type SetAuthUserDataActionPayloadType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

type setAuthUserDataActionType = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataActionPayloadType;
};

//Ac
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

export const getAuthUserData = () => (dispatch: any) => {
  return authAPI.me().then((response: any) => {
    if (response.data.resultCode === 0) {
      let { id, email, login } = response.data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  });
};

export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: any) => {
  authAPI.login(email, password, rememberMe).then((response: any) => {
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
      dispatch(stopSubmit('login', { _error: message }));
    }
  });
};

export const logout = () => (dispatch: any) => {
  authAPI.logout().then((response: any) => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  });
};

export default authReducer;
