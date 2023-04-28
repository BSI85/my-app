//AuthType

export type GetAuthAPIDataType = {
  id: number;
  email: string;
  login: string;
};

export type LogInAPIDataType = {
  userId: number;
};

export type CaptchaAPIType = {
  url: string;
};
