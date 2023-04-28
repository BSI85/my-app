import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-store';
import { InferActionsTypes } from '../components/types/types';

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

type InitialStateType = typeof initialState;
type DialogsActionsType = InferActionsTypes<typeof dialogsActions>;

const dialogsReducer = (state = initialState, action: DialogsActionsType): InitialStateType => {
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

const dialogsActions = {
  sendMessageCreator: (addNewMessage: string) => ({ type: SEND_MESSAGE, addNewMessage } as const),
};

//Thunk Thunk Thunk

export const sendMessage = (addNewMessage: string): ThunkAction<void, AppStateType, unknown, DialogsActionsType> => {
  return (dispatch) => {
    dispatch(dialogsActions.sendMessageCreator(addNewMessage));
  };
};

export default dialogsReducer;
