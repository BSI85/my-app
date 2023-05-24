import { AppStateType } from '../redux-store';

export const getProfile = (state: AppStateType) => {
  return state.profilePage.profile;
};

export const getStatus = (state: AppStateType) => {
  return state.profilePage.status;
};

export const getAuthorizedUserId = (state: AppStateType) => {
  return state.auth.id;
};

export const isAuth = (state: AppStateType) => {
  return state.auth.isAuth;
};

export const getPostsData = (state: AppStateType) => {
  return state.profilePage.postsData;
};
