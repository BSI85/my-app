const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';

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
  newMessageText: '',
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT: {
      return {
        ...state,
        newMessageText: action.newText,
      };
    }
    case SEND_MESSAGE: {
      return {
        ...state,
        messagesData: [...state.messagesData, { id: 17, message: state.newMessageText }],
        newMessageText: '',
      };
    }
    default:
      return state;
  }
};

//Action creators:
export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageTextCreator = (text) => ({ type: UPDATE_NEW_MESSAGE_TEXT, newText: text });

export default dialogsReducer;
