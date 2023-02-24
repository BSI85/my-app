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
    { id: 1, message: 'Hello' },
    { id: 2, message: 'What you doing?' },
    { id: 3, message: 'Where are you?' },
    { id: 4, message: 'Hello!' },
    { id: 5, message: 'Valera, nastalo twoe vremya' },
  ],
  newMessageText: '',
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT:
      state.newMessageText = action.newText;
      return state;
    case SEND_MESSAGE:
      let newMessage = {
        id: 5,
        message: state.newMessageText,
      };
      state.messagesData.push(newMessage);
      state.newMessageText = '';
      return state;
    default:
      return state;
  }
};

//Action creators:
export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageTextCreator = (text) => ({ type: UPDATE_NEW_MESSAGE_TEXT, newText: text });

export default dialogsReducer;
