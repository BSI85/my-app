import { ThunkAction } from 'redux-thunk';
import { DialogsDataType, MessagesDataType } from '../components/types/types';
import { AppStateType } from './redux-store';

//Types
type InitialStateType = {
  dialogsData: Array<DialogsDataType>;
  messagesData: Array<MessagesDataType>;
};

type sendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE;
  addNewMessage: string;
};

const SEND_MESSAGE = 'my-app/dialogs/SEND-MESSAGE';

let initialState = {
  dialogsData: [
    { id: 2, name: 'Prol' },
    { id: 4, name: 'Snezhana' },
    { id: 5, name: 'Balamut' },
    { id: 7, name: 'Valera' },
  ],

  messagesData: [
    { id: 11, message: 'Hello' },
    { id: 12, message: 'What you doing?' },
    { id: 13, message: 'Where are you?' },
    { id: 24, message: 'Hello!' },
    { id: 15, message: 'Valera, nastalo twoe vremya' },
  ],
};

const dialogsReducer = (state = initialState, action: sendMessageCreatorActionType): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE: {
      return {
        ...state,
        messagesData: [...state.messagesData, { id: state.messagesData.length + 1, message: action.addNewMessage }],
      };
    }
    default:
      return state;
  }
};

//Action creators:
export const sendMessageCreator = (addNewMessage: string): sendMessageCreatorActionType => ({
  type: SEND_MESSAGE,
  addNewMessage,
});

//Thunk Thunk Thunk

export const sendMessage = (
  addNewMessage: string
): ThunkAction<void, AppStateType, unknown, sendMessageCreatorActionType> => {
  return (dispatch) => {
    dispatch(sendMessageCreator(addNewMessage));
  };
};

export default dialogsReducer;
