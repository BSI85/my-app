import {
  ChatStatusType,
  EventNamesTypes,
  MessagesRecivedSubscriberType,
  StatusChangedSubscriberType,
} from '../types/ChatType';

let subscribers = {
  messages_recived: [] as MessagesRecivedSubscriberType[],
  status_changed: [] as StatusChangedSubscriberType[],
};

let ws: WebSocket | null = null;

export const chatAPI = {
  start() {
    createChannel();
  },
  stop() {
    subscribers['messages_recived'] = [];
    subscribers['status_changed'] = [];
    cleanUp();
    ws?.close();
  },
  subscribe(eventName: EventNamesTypes, callback: MessagesRecivedSubscriberType | StatusChangedSubscriberType) {
    //@ts-ignore
    subscribers[eventName].push(callback);
    return () => {
      //@ts-ignore
      subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
    };
  },
  unsubscribe(eventName: EventNamesTypes, callback: MessagesRecivedSubscriberType | StatusChangedSubscriberType) {
    //@ts-ignore
    subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
  },
  sendChatMessage(message: string) {
    ws?.send(message);
  },
};

const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler);
  ws?.removeEventListener('message', messageHandler);
  ws?.removeEventListener('open', openHandler);
  ws?.removeEventListener('error', errorHandler);
};
const messageHandler = (e: MessageEvent) => {
  let newMessages = JSON.parse(e.data);
  subscribers['messages_recived'].forEach((s) => s(newMessages));
};

const openHandler = () => {
  notifySubscribersAboutStatus('ready');
};

const errorHandler = () => {
  notifySubscribersAboutStatus('error');
  console.error('ERROR');
};

const closeHandler = () => {
  console.log('close wsChannel');
  setTimeout(createChannel, 3000);
};

const notifySubscribersAboutStatus = (status: ChatStatusType) => {
  subscribers['status_changed'].forEach((s) => s(status));
};

function createChannel() {
  cleanUp();
  ws?.close();
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  notifySubscribersAboutStatus('pending');
  ws.addEventListener('close', closeHandler);
  ws.addEventListener('message', messageHandler);
  ws.addEventListener('open', openHandler);
  ws.addEventListener('error', errorHandler);
}
