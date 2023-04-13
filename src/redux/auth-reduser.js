import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from '../components/api/api';

const SET_AUTH_USER_DATA = 'my-app/auth/SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'my-app/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null, //if null captcha is not required
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    // case GET_CAPTCHA_URL_SUCCESS:
    //   return {
    //     ...state,
    //     captchaUrl: action.payload,
    //   };

    default:
      return state;
  }
};

//Action creators:

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_AUTH_USER_DATA,
  payload: { userId, email, login, isAuth },
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

//thunk thunk thunk thunk

export const getAuthUserData = () => {
  return async (dispatch) => {
    const data = await authAPI.getAuth();
    if (data.resultCode === 0) {
      let { id, email, login } = data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  };
};

export const logIn = (email, password, rememberMe, captcha) => {
  return async (dispatch) => {
    const data = await authAPI.logIn(email, password, rememberMe, captcha);
    if (data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      if (data.resultCode === 10) {
        dispatch(getCaptchaUrl());
      }
      dispatch(stopSubmit('login', { _error: data.messages.length > 0 ? data.messages[0] : 'Unknown error' }));
    }
  };
};

export const logOut = () => {
  return async (dispatch, getState) => {
    const data = await authAPI.logOut();
    if (data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
      getState().auth.captchaUrl = null;
    }
  };
};

export const getCaptchaUrl = () => {
  return async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
  };
};

export default authReducer;
