import { ProfilePhotosType } from './ProfileType';

//DIALOGS

export type MessagesDataType = {
  items: Array<MessageType>;
  totalCount: number;
  error: string | null;
};

export type MessageType = {
  id: number;
  body: string;
  translatedBody: string;
  addedAt: string;
  senderId: number;
  senderName: string;
  recipientId: number;
  viewed: boolean;
};

export type DialogsDataType = {
  id: number;
  userName: string;
  hasNewMessages: boolean;
  lastDialogActivityDate: string;
  lastUserActivityDate: string;
  newMessagesCount: number;
  photos: ProfilePhotosType;
};
