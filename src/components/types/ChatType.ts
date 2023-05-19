export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

export type SubscriberType = (messages: ChatMessageType[]) => void;

export type ChatStatusType = 'pending' | 'ready' | 'error';

export type MessagesRecivedSubscriberType = (messages: ChatMessageType[]) => void;
export type StatusChangedSubscriberType = (status: ChatStatusType) => void;
export type EventNamesTypes = 'messages_recived' | 'status_changed';
