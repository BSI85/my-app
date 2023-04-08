import { profileAPI } from '../components/api/api';
import { stopSubmit } from 'redux-form';

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
  profile: null,
  status: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        postsData: [{ id: 4, post: action.addNewPost, likes: 0 }, ...state.postsData],
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

//Action creators:
export const addPostCreator = (addNewPost) => ({ type: ADD_POST, addNewPost });

export const deletePostCreator = (postId) => ({ type: DELETE_POST, postId });

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});

export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status });

export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos });

//Thunks   Thunks   Thunks   Thunks

export const addPost = (addNewPost) => {
  return (dispatch) => {
    dispatch(addPostCreator(addNewPost));
  };
};

export const getUserProfile = (userId) => {
  return async (dispatch) => {
    const data = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(data));
  };
};

export const getUserStatus = (userId) => {
  return async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(data));
  };
};

export const updateUserStatus = (status) => {
  return async (dispatch) => {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
      dispatch(setUserStatus(status));
    }
  };
};

export const savePhoto = (file) => {
  return async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
      dispatch(savePhotoSuccess(data.data.photos));
    }
  };
};

export const saveProfile = (profile) => {
  return async (dispatch, getState) => {
    const data = await profileAPI.saveProfile(profile);
    const userId = getState().auth.userId;

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
