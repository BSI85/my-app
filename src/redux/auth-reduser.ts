import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from '../components/api/api';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-store';
import { Action } from 'redux';
import { ResultCodeEnum } from '../components/types/types';

const SET_AUTH_USER_DATA = 'my-app/auth/SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'my-app/auth/GET_CAPTCHA_URL_SUCCESS';

type InitialStateType = {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  captchaUrl: string | null;
};

let initialState: InitialStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null, //if null captcha is not required
};

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

//Action creators:

type SetAuthUserDataActionPayloadType = {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

type SetAuthUserDataActionType = {
  type: typeof SET_AUTH_USER_DATA;
  payload: SetAuthUserDataActionPayloadType;
};

type GetCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  payload: { captchaUrl: string };
};

type AuthActionsType = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType;

type ProfileThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AuthActionsType>;

export const setAuthUserData = (
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserDataActionType => ({
  type: SET_AUTH_USER_DATA,
  payload: { id, email, login, isAuth },
});

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

//thunk thunk thunk thunk

export const getAuthUserData = (): ProfileThunkType => {
  return async (dispatch) => {
    const data = await authAPI.getAuth();
    if (data.resultCode === ResultCodeEnum.success) {
      let { id, email, login } = data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  };
};

export const logIn = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
): ThunkAction<Promise<void>, AppStateType, unknown, Action<any>> => {
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

export const logOut = (): ProfileThunkType => {
  return async (dispatch, getState) => {
    const data = await authAPI.logOut();
    if (data.resultCode === ResultCodeEnum.success) {
      dispatch(setAuthUserData(null, null, null, false));
      getState().auth.captchaUrl = null;
    }
  };
};

export const getCaptchaUrl = (): ProfileThunkType => {
  return async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
  };
};

export default authReducer;
