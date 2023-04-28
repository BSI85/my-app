import { usersAPI } from '../components/api/usersAPI';
import { updateObjectInArray } from '../components/Common/utilities/objectHelper';
import { UsersDataType } from '../components/types/UsersDataType';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-store';
import { Dispatch } from 'react';
import { InferActionsTypes } from '../components/types/types';

const FOLLOW = 'my-app/users/FOLLOW';
const UNFOLLOW = 'my-app/users/UNFOLLOW';
const SET_USERS = 'my-app/users/SET_USERS';
const SET_CURRENT_PAGE = 'my-app/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'my-app/users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'my-app/users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'my-app/users/TOGGLE_IS_FOLLOWING_IN_PROGRESS';

//THUNK TYPE
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, UserActionsTypes>;

let initialState = {
  usersData: [] as Array<UsersDataType>,
  pageSize: 15,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as number[],
};

type InitialStateType = typeof initialState;
type UserActionsTypes = InferActionsTypes<typeof userActions>;

const usersReducer = (state = initialState, action: UserActionsTypes): InitialStateType => {
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
export const userActions = {
  followSuccess: (userId: number) => ({ type: FOLLOW, userId } as const),
  unfollowSuccess: (userId: number) => ({ type: UNFOLLOW, userId } as const),
  setUsers: (usersData: Array<UsersDataType>) => ({ type: SET_USERS, usersData } as const),
  setCurrentPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const),
  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: SET_TOTAL_USERS_COUNT,
      totalUsersCount,
    } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: TOGGLE_IS_FETCHING,
      isFetching,
    } as const),
  toggleFollowingInProgress: (isFetching: boolean, userId: number) =>
    ({
      type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
      isFetching,
      userId,
    } as const),
};
//Thunk creator

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
  return async (dispatch) => {
    dispatch(userActions.toggleIsFetching(true));
    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(userActions.setCurrentPage(currentPage));
    dispatch(userActions.setUsers(data.items));
    dispatch(userActions.setTotalUsersCount(data.totalCount));
    dispatch(userActions.toggleIsFetching(false));
  };
};

const _followUnfollow = async (
  dispatch: Dispatch<UserActionsTypes>,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => UserActionsTypes
) => {
  dispatch(userActions.toggleFollowingInProgress(true, userId));
  const data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(userActions.toggleFollowingInProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollow(dispatch, userId, usersAPI.follow.bind(usersAPI), userActions.followSuccess);
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), userActions.unfollowSuccess);
  };
};

export default usersReducer;
