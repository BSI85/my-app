import { ThunkAction } from 'redux-thunk';
import { getAuthUserData } from './auth-reduser';
import { AppStateType } from './redux-store';
import { InferActionsTypes } from '../components/types/types';

const INITIALIZE_SUCCESS = ' INITIALIZE_SUCCESS';

let initialState = {
  initialized: false,
};

type InitialStateType = typeof initialState;
type DialogsActionsType = InferActionsTypes<typeof appActions>;

const appReducer = (state = initialState, action: DialogsActionsType): InitialStateType => {
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

const appActions = {
  initializeSuccess: () => ({
    type: INITIALIZE_SUCCESS,
  }),
};

//thunk thunk thunk thunk

export const initializeApp = (): ThunkAction<void, AppStateType, unknown, DialogsActionsType> => {
  return (dispatch) => {
    let propmise = dispatch(getAuthUserData());

    propmise.then(() => {
      dispatch(appActions.initializeSuccess());
    });
  };
};

export default appReducer;
