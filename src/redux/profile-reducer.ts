import { profileAPI } from '../components/api/profileAPI';
import { FormAction, stopSubmit } from 'redux-form';
import { ProfilePhotosType, ProfileType } from '../components/types/ProfileType';
import { AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { InferActionsTypes } from '../components/types/types';

const ADD_POST = 'my-app/profile/ADD-POST';
const DELETE_POST = 'my-app/profile/DELETE_POST';
const SET_USER_PROFILE = 'my-app/profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'my-app/profile/SET_USER_STATUS';
const SAVE_PHOTO_SUCCESS = 'my-app/profile/SAVE_PHOTO_SUCCESS';

let initialState = {
  postsData: [
    { id: 1, post: 'Hi, how are you', likes: 35 },
    { id: 2, post: "It's my first post", likes: 28 },
    { id: 3, post: 'Hello!', likes: 5 },
  ],
  profile: null as unknown as ProfileType,
  status: '',
};

type InitialStateType = typeof initialState;
type ProfileActionsType = InferActionsTypes<typeof profileActions>;

//Action creator TYPES:

const profileReducer = (state = initialState, action: ProfileActionsType): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        postsData: [{ id: state.postsData.length + 1, post: action.addNewPost, likes: 0 }, ...state.postsData],
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        postsData: state.postsData.filter((p) => p.id !== action.postId),
      };
    }

    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }

    case SET_USER_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }

    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    }

    default:
      return state;
  }
};

//Thunk Type

type ProfileThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ProfileActionsType>;
type ProfileThunkTypeNoPromise = ThunkAction<void, AppStateType, unknown, ProfileActionsType>;
type ProfileThunkTypeFormAction = ThunkAction<Promise<void>, AppStateType, unknown, FormAction>;

//Action creators:

export const profileActions = {
  addPostCreator: (addNewPost: string) => ({ type: ADD_POST, addNewPost } as const),
  deletePostCreator: (postId: number) => ({ type: DELETE_POST, postId } as const),
  setUserProfile: (profile: ProfileType) => ({ type: SET_USER_PROFILE, profile } as const),
  setUserStatus: (status: string) => ({ type: SET_USER_STATUS, status } as const),
  savePhotoSuccess: (photos: ProfilePhotosType) => ({ type: SAVE_PHOTO_SUCCESS, photos } as const),
};

//Thunks   Thunks   Thunks   Thunks

export const addPost = (addNewPost: string): ProfileThunkTypeNoPromise => {
  return (dispatch) => {
    dispatch(profileActions.addPostCreator(addNewPost));
  };
};

export const getUserProfile = (userId: number | null): ProfileThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.getProfile(userId);
    dispatch(profileActions.setUserProfile(data));
  };
};

export const getUserStatus = (userId: number): ProfileThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(profileActions.setUserStatus(data));
  };
};

export const updateUserStatus = (status: string): ProfileThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
      dispatch(profileActions.setUserStatus(status));
    }
  };
};

export const savePhoto = (file: File): ProfileThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
      dispatch(profileActions.savePhotoSuccess(data.data.photos));
    }
  };
};

export const saveProfile = (profile: ProfileType): ProfileThunkTypeFormAction => {
  return async (dispatch, getState) => {
    const data = await profileAPI.saveProfile(profile);
    const userId = getState().auth.id;

    if (data.resultCode === 0) {
      dispatch(getUserProfile(userId));
    } else {
      let wrongNetwork = data.messages[0].slice(data.messages[0].indexOf('>') + 1, -1).toLowerCase();
      dispatch(stopSubmit('settings', { contacts: { [wrongNetwork]: data.messages[0] } }));
      return Promise.reject();
    }
  };
};

export default profileReducer;
