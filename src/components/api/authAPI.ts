import { DefaultResponseType } from '../types/types';
import { GetAuthAPIDataType, LogInAPIDataType, CaptchaAPIType } from '../types/AuthType';
import { instance } from './api';

export const authAPI = {
  getAuth() {
    return instance.get<DefaultResponseType<GetAuthAPIDataType>>(`auth/me`).then((response) => response.data);
  },
  logIn(email: string, password: string, rememberMe: boolean = false, captcha: string | null) {
    return instance
      .post<DefaultResponseType<LogInAPIDataType>>('auth/login', { email, password, rememberMe, captcha })
      .then((response) => response.data);
  },
  logOut() {
    return instance.delete<DefaultResponseType>('auth/login').then((response) => response.data);
  },
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get<CaptchaAPIType>(`/security/get-captcha-url`).then((response) => response.data);
  },
};
