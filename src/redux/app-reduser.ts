import { ThunkAction } from 'redux-thunk';
import { getAuthUserData } from './auth-reduser';
import { AppStateType } from './redux-store';

const INITIALIZE_SUCCESS = ' INITIALIZE_SUCCESS';

type InitialStateType = {
  initialized: boolean;
};

let initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action: InitializeSuccessActionType): InitialStateType => {
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
type InitializeSuccessActionType = {
  type: typeof INITIALIZE_SUCCESS;
};

export const initializeSuccess = (): InitializeSuccessActionType => ({
  type: INITIALIZE_SUCCESS,
});

//thunk thunk thunk thunk

export const initializeApp = (): ThunkAction<void, AppStateType, unknown, InitializeSuccessActionType> => {
  return (dispatch) => {
    let propmise = dispatch(getAuthUserData());

    propmise.then(() => {
      dispatch(initializeSuccess());
    });
  };
};

export default appReducer;
