import { stopSubmit } from 'redux-form';
import { authAPI } from '../components/api/api';

const SET_AUTH_USER_DATA = 'my-app/auth/SET_AUTH_USER_DATA';

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};

//Action creators:

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_AUTH_USER_DATA,
  data: { userId, email, login, isAuth },
});

//thunk thunk thunk thunk

export const getAuthUserData = () => {
  return async (dispatch) => {
    const data = await authAPI.getAuth();
    if (data.resultCode === 0) {
      let { id, email, login } = data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  };
};

export const logIn = (email, password, rememberMe) => {
  return async (dispatch) => {
    const data = await authAPI.logIn(email, password, rememberMe);
    if (data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      dispatch(stopSubmit('login', { _error: data.messages.length > 0 ? data.messages[0] : 'Unknown error' }));
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    const data = await authAPI.logOut();
    if (data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  };
};

export default authReducer;
