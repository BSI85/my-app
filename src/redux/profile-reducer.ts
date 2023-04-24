import { profileAPI } from '../components/api/api';
import { stopSubmit } from 'redux-form';
import { PostsDataType, ProfilePhotosType, ProfileType } from '../components/types/types';
import { AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

const ADD_POST = 'my-app/profile/ADD-POST';
const DELETE_POST = 'my-app/profile/DELETE_POST';
const SET_USER_PROFILE = 'my-app/profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'my-app/profile/SET_USER_STATUS';
const SAVE_PHOTO_SUCCESS = 'my-app/profile/SAVE_PHOTO_SUCCESS';

type InitialStateType = {
  postsData: Array<PostsDataType>;
  profile: ProfileType;
  status: string;
};

let initialState: InitialStateType = {
  postsData: [
    { id: 1, post: 'Hi, how are you', likes: 35 },
    { id: 2, post: "It's my first post", likes: 28 },
    { id: 3, post: 'Hello!', likes: 5 },
  ],
  profile: null as unknown as ProfileType,
  status: '',
};

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

//Action creator TYPES:

type AddPostCreatorType = { type: typeof ADD_POST; addNewPost: string };
type DeletePostCreatorType = { type: typeof DELETE_POST; postId: number };
type SetUserProfileType = { type: typeof SET_USER_PROFILE; profile: ProfileType };
type SetUserStatusType = { type: typeof SET_USER_STATUS; status: string };
type SavePhotoSuccessType = { type: typeof SAVE_PHOTO_SUCCESS; photos: ProfilePhotosType };

type ProfileActionsType =
  | AddPostCreatorType
  | DeletePostCreatorType
  | SetUserProfileType
  | SetUserStatusType
  | SavePhotoSuccessType;

//Thunk Type

type ProfileThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ProfileActionsType>;

//Action creators:
export const addPostCreator = (addNewPost: string): AddPostCreatorType => ({ type: ADD_POST, addNewPost });

export const deletePostCreator = (postId: number): DeletePostCreatorType => ({ type: DELETE_POST, postId });

export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({
  type: SET_USER_PROFILE,
  profile,
});

export const setUserStatus = (status: string): SetUserStatusType => ({ type: SET_USER_STATUS, status });

export const savePhotoSuccess = (photos: ProfilePhotosType): SavePhotoSuccessType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

//Thunks   Thunks   Thunks   Thunks

export const addPost = (addNewPost: string): ThunkAction<void, AppStateType, unknown, ProfileActionsType> => {
  return (dispatch) => {
    dispatch(addPostCreator(addNewPost));
  };
};

export const getUserProfile = (userId: number | null): ProfileThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(data));
  };
};

export const getUserStatus = (userId: number): ProfileThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(data));
  };
};

export const updateUserStatus = (status: string): ProfileThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
      dispatch(setUserStatus(status));
    }
  };
};

export const savePhoto = (file: ProfilePhotosType): ProfileThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
      dispatch(savePhotoSuccess(data.data.photos));
    }
  };
};

export const saveProfile = (profile: ProfileType): ThunkAction<Promise<void>, AppStateType, unknown, Action<any>> => {
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
