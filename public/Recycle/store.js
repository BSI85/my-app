import dialogsReducer from './dialogs-reducer';
import friendsReducer from './friends-reducer';
import profileReducer from './profile-reducer';

let store = {
  _state: {
    profilePage: {
      postsData: [
        { id: 1, post: 'Hi, how are you', likes: 35 },
        { id: 2, post: "It's my first post", likes: 28 },
        { id: 3, post: 'Hello!', likes: 5 },
      ],
      newPostText: 'test text',
    },
    dialogsPage: {
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
    },
    friendsPage: {
      friendsData: [
        { id: 1, name: 'Zhiroslav', age: 26, online: 1 },
        { id: 2, name: 'Prol', age: 37, online: 1 },
        { id: 3, name: 'Fyodor', age: 31, online: 0 },
        { id: 4, name: 'Snezhana', age: 33, online: 1 },
        { id: 5, name: 'Balamut', age: 23, online: 0 },
        { id: 6, name: 'Alyona', age: 41, online: 1 },
        { id: 7, name: 'Valera', age: 29, online: 1 },
      ],
    },
  },
  _callSubscriber() {},

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.friendsPage = friendsReducer(this._state.friendsPage, action);
    this._callSubscriber(this._state);
  },
};

export default store;
