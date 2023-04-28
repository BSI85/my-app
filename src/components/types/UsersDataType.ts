import { ProfilePhotosType } from './ProfileType';

//USERS******************

export type UsersDataType = {
  id: number;
  name: string;
  status: string;
  photos: ProfilePhotosType;
  followed: boolean;
};

export type GetUsersAPIType = {
  items: Array<UsersDataType>;
  totalCount: number;
  error: string | null;
};
