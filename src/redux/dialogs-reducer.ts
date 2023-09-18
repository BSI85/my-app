import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-store';
import { InferActionsTypes } from '../components/types/types';
import { DialogsDataType, MessagesDataType } from '../components/types/DialogsType';
import { dialogsAPI } from '../components/api/dialogsAPI';

const SET_MESSAGES_DATA = 'my-app/dialogs/SET_MESSAGES_DATA';
const SET_DIALOGS_DATA = 'my-app/dialogs/SET_DIALOGS_DATA';
const UPDATE_MESSAGES_DATA = 'my-app/dialogs/UPDATE_MESSAGES_DATA';

let initialState = {
  dialogsData: [] as Array<DialogsDataType>,
  messagesData: {} as MessagesDataType,
};

type InitialStateType = typeof initialState;
type DialogsActionsType = InferActionsTypes<typeof dialogsActions>;

const dialogsReducer = (state = initialState, action: DialogsActionsType): InitialStateType => {
  switch (action.type) {
    case SET_DIALOGS_DATA: {
      return {
        ...state,
        dialogsData: action.dialogsData,
      };
    }
    case SET_MESSAGES_DATA: {
      return {
        ...state,
        messagesData: action.messagesData,
      };
    }
    // case UPDATE_MESSAGES_DATA: {
    //   return {
    //     ...state,
    //     messagesData: action.messagesData,
    //   };
    // }

    // case SEND_MESSAGE: {
    //   return {
    //     ...state,
    //     messagesData: [
    //       ...state.messagesData,
    //       { messageId: state.messagesData.length + 1, message: action.addNewMessage },
    //     ],
    //   };
    // }

    default:
      return state;
  }
};

//Action creators:

const dialogsActions = {
  setDialogsCreator: (dialogsData: Array<DialogsDataType>) => ({ type: SET_DIALOGS_DATA, dialogsData } as const),
  setMessagesCreator: (messagesData: MessagesDataType) => ({ type: SET_MESSAGES_DATA, messagesData } as const),
  // updateMessagesCreator: ()
};

//Thunk Thunk Thunk

type DialogsThunkType = ThunkAction<Promise<void>, AppStateType, unknown, DialogsActionsType>;

export const startNewDialog = (id: number): ThunkAction<void, AppStateType, unknown, DialogsActionsType> => {
  return async (dispatch) => {
    dialogsAPI.startDialog(id);
    let data = await dialogsAPI.getDialogs();
    dispatch(dialogsActions.setDialogsCreator(data));
  };
};

export const setUsersMessagesData = (id: number): ThunkAction<void, AppStateType, unknown, DialogsActionsType> => {
  return async (dispatch) => {
    let data = await dialogsAPI.getDialogMessages(id, 1, 10);
    dispatch(dialogsActions.setMessagesCreator(data));
  };
};

export const setDialogsData = (): ThunkAction<void, AppStateType, unknown, DialogsActionsType> => {
  return async (dispatch) => {
    let data = await dialogsAPI.getDialogs();
    dispatch(dialogsActions.setDialogsCreator(data));
  };
};

export const sendMessage = (userId: number, body: string): DialogsThunkType => {
  return async (dispatch) => {
    const data = await dialogsAPI.sendMessage(userId, body);
    if (data.resultCode === 0) {
      const dataM = await dialogsAPI.getDialogMessages(userId, 1, 10);
      dispatch(dialogsActions.setMessagesCreator(dataM));
    }
  };
};

export const deleteMessage = (
  id: number,
  dialogUserId: number
): ThunkAction<void, AppStateType, unknown, DialogsActionsType> => {
  return async (dispatch) => {
    let data = await dialogsAPI.deleteMessage(id);
    if (data.resultCode === 0) {
      const dataM = await dialogsAPI.getDialogMessages(dialogUserId, 1, 10);
      dispatch(dialogsActions.setMessagesCreator(dataM));
    }
  };
};

export default dialogsReducer;
