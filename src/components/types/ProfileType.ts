//PROFILE******************

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

export type PhotoResponseAPIType = {
  photos: ProfilePhotosType;
};

export type PostsDataType = { id: number; post: string; likes: number };
