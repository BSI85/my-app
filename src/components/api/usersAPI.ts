import { DefaultResponseType } from '../types/types';
import { GetUsersAPIType } from '../types/UsersDataType';
import { instance } from './api';

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 15) {
    return instance
      .get<GetUsersAPIType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },

  unfollow(userID: number) {
    return instance.delete<DefaultResponseType>(`follow/${userID}`).then((response) => response.data);
  },
  follow(userID: number) {
    return instance.post<DefaultResponseType>(`follow/${userID}`).then((response) => response.data);
  },
};
