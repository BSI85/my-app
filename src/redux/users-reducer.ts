import { usersAPI } from '../components/api/api';
import { updateObjectInArray } from '../components/Common/utilities/objectHelper';
import { UsersDataType } from '../components/types/types';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-store';
import { Dispatch } from 'react';

const FOLLOW = 'my-app/users/FOLLOW';
const UNFOLLOW = 'my-app/users/UNFOLLOW';
const SET_USERS = 'my-app/users/SET_USERS';
const SET_CURRENT_PAGE = 'my-app/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'my-app/users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'my-app/users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'my-app/users/TOGGLE_IS_FOLLOWING_IN_PROGRESS';

type InitialStateType = {
  usersData: Array<UsersDataType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<number>; //Array of users Id's
};

//Action creators TYPES:
type FollowSuccessType = { type: typeof FOLLOW; userId: number };
type UnfollowSuccessType = { type: typeof UNFOLLOW; userId: number };

type SetUsersType = { type: typeof SET_USERS; usersData: Array<UsersDataType> };
type SetCurrentPageType = { type: typeof SET_CURRENT_PAGE; currentPage: number };
type SetTotalUsersCountType = { type: typeof SET_TOTAL_USERS_COUNT; totalUsersCount: number };
type ToggleIsFetchingType = { type: typeof TOGGLE_IS_FETCHING; isFetching: boolean };
type ToggleFollowingInProgressType = {
  type: typeof TOGGLE_IS_FOLLOWING_IN_PROGRESS;
  isFetching: boolean;
  userId: number;
};

type UserActionTypes =
  | FollowSuccessType
  | UnfollowSuccessType
  | SetUsersType
  | SetCurrentPageType
  | SetTotalUsersCountType
  | ToggleIsFetchingType
  | ToggleFollowingInProgressType;

//THUNK TYPE
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, UserActionTypes>;

let initialState: InitialStateType = {
  usersData: [],
  pageSize: 15,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action: UserActionTypes): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        usersData: updateObjectInArray(state.usersData, action.userId, 'id', { followed: true }),
      };

    case UNFOLLOW:
      return {
        ...state,
        usersData: updateObjectInArray(state.usersData, action.userId, 'id', { followed: false }),
      };

    case SET_USERS:
      return {
        ...state,
        usersData: action.usersData,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };

    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case TOGGLE_IS_FOLLOWING_IN_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };

    default:
      return state;
  }
};

//Action creators:
export const followSuccess = (userId: number): FollowSuccessType => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId: number): UnfollowSuccessType => ({
  type: UNFOLLOW,
  userId,
});
export const setUsers = (usersData: Array<UsersDataType>): SetUsersType => ({ type: SET_USERS, usersData });
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
});
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
export const toggleFollowingInProgress = (isFetching: boolean, userId: number): ToggleFollowingInProgressType => ({
  type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
  isFetching,
  userId,
});

//Thunk creator

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setCurrentPage(currentPage));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(toggleIsFetching(false));
  };
};

const _followUnfollow = async (
  dispatch: Dispatch<UserActionTypes>,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => FollowSuccessType | UnfollowSuccessType
) => {
  dispatch(toggleFollowingInProgress(true, userId));
  const data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingInProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
  };
};

export default usersReducer;
