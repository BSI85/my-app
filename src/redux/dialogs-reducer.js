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
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      return {
        ...state,
        messagesData: [...state.messagesData, { id: 17, message: action.addNewMessage }],
      };
    }
    default:
      return state;
  }
};

//Action creators:
export const sendMessageCreator = (addNewMessage) => ({ type: SEND_MESSAGE, addNewMessage });

export default dialogsReducer;
