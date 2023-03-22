import { getAuthUserData } from './auth-reduser';

const INITIALIZE_SUCCESS = ' INITIALIZE_SUCCESS';

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

//Action creators:

export const initializeSuccess = () => ({
  type: INITIALIZE_SUCCESS,
});

//thunk thunk thunk thunk

export const initializeApp = () => {
  return (dispatch) => {
    let propmise = dispatch(getAuthUserData());

    propmise.then(() => {
      dispatch(initializeSuccess());
    });
  };
};

export default appReducer;
