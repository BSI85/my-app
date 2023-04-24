import { applyMiddleware, combineReducers, legacy_createStore, compose } from 'redux';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';
import profileReducer from './profile-reducer';
import authReducer from './auth-reduser';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from './app-reduser';

let rootReduser = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer,
});

export type AppStateType = ReturnType<typeof rootReduser>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = legacy_createStore(rootReduser, composeEnhancers(applyMiddleware(thunkMiddleware)));

// window.store = store;
export default store;
