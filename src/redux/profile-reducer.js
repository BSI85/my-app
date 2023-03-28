import { profileAPI } from '../components/api/api';

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

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
        postsData: state.postsData.filter((p) => p.id != action.postId),
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

//Thunks   Thunks   Thunks   Thunks

export const addPost = (addNewPost) => {
  return (dispatch) => {
    dispatch(addPostCreator(addNewPost));
  };
};

export const getUserProfile = (userId) => {
  return (dispatch) => {
    profileAPI.getProfile(userId).then((data) => {
      dispatch(setUserProfile(data));
    });
  };
};

export const getUserStatus = (userId) => {
  return (dispatch) => {
    profileAPI.getStatus(userId).then((data) => {
      dispatch(setUserStatus(data));
    });
  };
};

export const updateUserStatus = (status) => {
  return (dispatch) => {
    profileAPI.updateStatus(status).then((data) => {
      if (data.resultCode === 0) {
        dispatch(setUserStatus(status));
      }
    });
  };
};

export default profileReducer;
