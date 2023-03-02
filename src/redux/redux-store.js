import { combineReducers, legacy_createStore } from 'redux';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';
import profileReducer from './profile-reducer';

let redusers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
});

let store = legacy_createStore(redusers);

export default store;
