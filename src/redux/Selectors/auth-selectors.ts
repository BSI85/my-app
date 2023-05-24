import { AppStateType } from '../redux-store';

export const getAuthorizedUserId = (state: AppStateType) => {
  return state.auth.id;
};

export const getIsAuth = (state: AppStateType) => {
  return state.auth.isAuth;
};

export const getLogin = (state: AppStateType) => {
  return state.auth.login;
};

export const getCaptchaUrl = (state: AppStateType) => {
  return state.auth.captchaUrl;
};
