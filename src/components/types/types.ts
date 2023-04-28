import { AppStateType } from '../../redux/redux-store';

//STORE
export type GetStateType = () => AppStateType;

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;

//STANDART (GENERIC)
export type DefaultResponseType<D = {}> = {
  resultCode: ResultCodeEnum;
  messages: Array<string>;
  data: D;
};

export enum ResultCodeEnum {
  success = 0,
  error = 1,
  captchaIsRequired = 10,
}
