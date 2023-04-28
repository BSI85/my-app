import { DefaultResponseType } from '../types/types';
import { ProfileType, PhotoResponseAPIType } from '../types/ProfileType';
import { instance } from './api';

export const profileAPI = {
  getProfile(userId: number | null) {
    return instance.get<ProfileType>(`profile/${userId}`).then((response) => response.data);
  },
  getStatus(userId: number) {
    return instance.get<string>(`/profile/status/${userId}`).then((response) => response.data);
  },
  updateStatus(status: string) {
    return instance.put<DefaultResponseType>(`/profile/status/`, { status: status }).then((response) => response.data);
  },
  savePhoto(photoFile: File) {
    const formData = new FormData();
    formData.append('image', photoFile);
    return instance
      .put<DefaultResponseType<PhotoResponseAPIType>>(`/profile/photo/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },
  saveProfile(profile: ProfileType) {
    return instance.put<DefaultResponseType>(`/profile/`, profile).then((response) => response.data);
  },
};
