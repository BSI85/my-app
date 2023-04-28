import { FormAction, stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from '../components/api/authAPI';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-store';
import { ResultCodeEnum, InferActionsTypes } from '../components/types/types';

const SET_AUTH_USER_DATA = 'my-app/auth/SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'my-app/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};

type InitialStateType = typeof initialState;
type AuthActionsType = InferActionsTypes<typeof authActions>;

const authReducer = (state = initialState, action: AuthActionsType): InitialStateType => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

//Action:

const authActions = {
  setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({ type: SET_AUTH_USER_DATA, payload: { id, email, login, isAuth } } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } } as const),
};

//thunk thunk thunk thunk
type AuthThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AuthActionsType>;
type ProfileThunkTypeFormAction = ThunkAction<Promise<void>, AppStateType, unknown, FormAction>;

export const getAuthUserData = (): AuthThunkType => {
  return async (dispatch) => {
    const data = await authAPI.getAuth();
    if (data.resultCode === ResultCodeEnum.success) {
      let { id, email, login } = data.data;
      dispatch(authActions.setAuthUserData(id, email, login, true));
    }
  };
};

export const logIn = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
): ProfileThunkTypeFormAction => {
  return async (dispatch) => {
    const data = await authAPI.logIn(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodeEnum.success) {
      dispatch(getAuthUserData());
    } else {
      if (data.resultCode === ResultCodeEnum.captchaIsRequired) {
        dispatch(getCaptchaUrl());
      }
      dispatch(stopSubmit('login', { _error: data.messages.length > 0 ? data.messages[0] : 'Unknown error' }));
    }
  };
};

export const logOut = (): AuthThunkType => {
  return async (dispatch, getState) => {
    const data = await authAPI.logOut();
    if (data.resultCode === ResultCodeEnum.success) {
      dispatch(authActions.setAuthUserData(null, null, null, false));
      getState().auth.captchaUrl = null;
    }
  };
};

export const getCaptchaUrl = (): AuthThunkType => {
  return async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(authActions.getCaptchaUrlSuccess(captchaUrl));
  };
};

export default authReducer;
