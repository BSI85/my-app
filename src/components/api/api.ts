import axios from 'axios';
import {
  CaptchaAPIType,
  GetAuthAPIType,
  GetUsersAPIType,
  LogInAPIType,
  PhotoResponceAPIType,
  ProfileType,
  SimpleResponceType,
} from '../types/types';

const instance = axios.create({
  withCredentials: true,
  headers: {
    'API-KEY': '24b47d6b-6530-492a-8e67-c175ec8bd72c',
  },
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 9) {
    return instance
      .get<GetUsersAPIType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },

  unfollow(userID: number) {
    return instance.delete<SimpleResponceType>(`follow/${userID}`).then((response) => response.data);
  },
  follow(userID: number) {
    return instance.post<SimpleResponceType>(`follow/${userID}`).then((response) => response.data);
  },
};

export const authAPI = {
  getAuth() {
    return instance.get<GetAuthAPIType>(`auth/me`).then((response) => response.data);
  },
  logIn(email: string, password: string, rememberMe: boolean = false, captcha: string | null) {
    return instance
      .post<LogInAPIType>('auth/login', { email, password, rememberMe, captcha })
      .then((response) => response.data);
  },
  logOut() {
    return instance.delete<SimpleResponceType>('auth/login').then((response) => response.data);
  },
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get<CaptchaAPIType>(`/security/get-captcha-url`).then((response) => response.data);
  },
};

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<ProfileType>(`profile/${userId}`).then((response) => response.data);
  },
  getStatus(userId: number) {
    return instance.get<string>(`/profile/status/${userId}`).then((response) => response.data);
  },
  updateStatus(status: string) {
    return instance.put<SimpleResponceType>(`/profile/status/`, { status: status }).then((response) => response.data);
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append('image', photoFile);
    return instance
      .put<PhotoResponceAPIType>(`/profile/photo/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },
  saveProfile(profile: ProfileType) {
    return instance.put<SimpleResponceType>(`/profile/`, profile).then((response) => response.data);
  },
};
