import { instance } from './api';

export const dialogsAPI = {
  getDialogs() {
    return instance.get<any>(`dialogs/`).then((response) => response.data);
  },
  startDialog(userId: number) {
    return instance.put<any>(`dialogs/${userId}`).then((response) => response.data);
  },
  getDialogMessages(userId: number, currentPage: number, pageSize: number) {
    return instance
      .get<any>(`dialogs/${userId}/messages?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  sendMessage(userId: number, body: string) {
    return instance.post<any>(`dialogs/${userId}/messages`, { body }).then((response) => response.data);
  },
  isMessageViewed(messageId: number) {
    return instance.get<any>(`dialogs/messages/${messageId}/viewed`).then((response) => response.data);
  },
  putMessageToSpam(messageId: number) {
    return instance.put<any>(`dialogs/messages/${messageId}/spam`).then((response) => response.data);
  },
  deleteMessage(messageId: number) {
    return instance.delete<any>(`dialogs/messages/${messageId}`).then((response) => response.data);
  },
  restoreMessage(messageId: number) {
    return instance.put<any>(`dialogs/messages/${messageId}/restore`).then((response) => response.data);
  },
  getDialogsByDate(userId: number, date: string) {
    return instance.get<any>(`dialogs/${userId}/messages/new?newerThen=${date}`).then((response) => response.data);
  },
  getNewMessagesCount() {
    return instance.get<any>(`dialogs/messages/new/count`).then((response) => response.data);
  },
};
