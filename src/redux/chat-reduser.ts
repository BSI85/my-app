import { chatAPI } from '../components/api/chatAPI';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-store';
import { InferActionsTypes } from '../components/types/types';
import { ChatMessageType, ChatStatusType } from '../components/types/ChatType';
import { Dispatch } from 'redux';

const MESSAGES_RECIVED = 'my-app/chat/MESSAGES_RECIVED';
const STATUS_CHANGED = 'my-app/chat/STATUS_CHANGED';

let initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as ChatStatusType,
};

type InitialStateType = typeof initialState;
type ChatActionsType = InferActionsTypes<typeof chatActions>;

const chatReducer = (state = initialState, action: ChatActionsType): InitialStateType => {
  switch (action.type) {
    case MESSAGES_RECIVED:
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      };

    case STATUS_CHANGED:
      return {
        ...state,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

//Action:

const chatActions = {
  messagesRecived: (messages: ChatMessageType[]) => ({ type: MESSAGES_RECIVED, payload: { messages } } as const),
  statusChanded: (status: ChatStatusType) => ({ type: STATUS_CHANGED, payload: { status } } as const),
};

//thunk thunk thunk thunk
type ChatThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ChatActionsType>;

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(chatActions.messagesRecived(messages));
    };
  }
  return _newMessageHandler;
};

let _statusChangedHandler: ((status: ChatStatusType) => void) | null = null;

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(chatActions.statusChanded(status));
    };
  }
  return _statusChangedHandler;
};

export const startMessagesListening = (): ChatThunkType => async (dispatch) => {
  chatAPI.start();
  chatAPI.subscribe('messages_recived', newMessageHandlerCreator(dispatch));
  chatAPI.subscribe('status_changed', statusChangedHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ChatThunkType => async (dispatch) => {
  chatAPI.unsubscribe('messages_recived', newMessageHandlerCreator(dispatch));
  chatAPI.unsubscribe('status_changed', statusChangedHandlerCreator(dispatch));
  chatAPI.stop();
};

export const sendChatMessage =
  (message: string): ChatThunkType =>
  async (dispatch) => {
    chatAPI.sendChatMessage(message);
  };

export default chatReducer;
