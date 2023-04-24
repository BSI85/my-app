import { AppStateType } from '../../redux/redux-store';

//STORE
export type GetStateType = () => AppStateType;

//PROFILE******************

export type PostsDataType = { id: number; post: string; likes: number };
export type ProfileType = {
  userId: number;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ProfileContactsType;
  photos: ProfilePhotosType;
};

export type ProfileContactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};
export type ProfilePhotosType = {
  small: string | null;
  large: string | null;
};

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
  error: string;
};

//DIALOGS
export type DialogsDataType = { id: number; name: string };
export type MessagesDataType = { id: number; message: string };

//AUTH

export type GetAuthAPIType = {
  resultCode: ResultCodeEnum;
  messages: Array<string>;
  data: {
    id: number;
    email: string;
    login: string;
  };
};

export enum ResultCodeEnum {
  success = 0,
  error = 1,
  captchaIsRequired = 10,
}

export type LogInAPIType = {
  resultCode: number;
  messages: Array<string>;
  data: {
    userId: number;
  };
};

export type SimpleResponceType = {
  resultCode: number;
  messages: Array<string>;
  data: {};
};

export type CaptchaAPIType = {
  url: string;
};

export type PhotoResponceAPIType = {
  data: ProfilePhotosType;
  resultCode: number;
  messages: Array<string>;
};
