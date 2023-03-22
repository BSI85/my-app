import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';
import profileReducer from './profile-reducer';
import authReducer from './auth-reduser';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from './app-reduser';

let redusers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer,
});

let store = legacy_createStore(redusers, applyMiddleware(thunkMiddleware));
window.store = store;
export default store;
