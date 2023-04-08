import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  headers: {
    'API-KEY': '24b47d6b-6530-492a-8e67-c175ec8bd72c',
  },
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 9) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then((response) => response.data);
  },

  unfollow(userID) {
    return instance.delete(`follow/${userID}`).then((response) => response.data);
  },
  follow(userID) {
    return instance.post(`follow/${userID}`).then((response) => response.data);
  },
};

export const authAPI = {
  getAuth() {
    return instance.get(`auth/me`).then((response) => response.data);
  },
  logIn(email, password, rememberMe = false) {
    return instance.post('auth/login', { email, password, rememberMe }).then((response) => response.data);
  },
  logOut() {
    return instance.delete('auth/login').then((response) => response.data);
  },
};

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`).then((response) => response.data);
  },
  getStatus(userId = 28295) {
    return instance.get(`/profile/status/${userId}`).then((response) => response.data);
  },
  updateStatus(status) {
    return instance.put(`/profile/status/`, { status: status }).then((response) => response.data);
  },
  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append('image', photoFile);
    return instance
      .put(`/profile/photo/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },
  saveProfile(profile) {
    return instance.put(`/profile/`, profile).then((response) => response.data);
  },
};
