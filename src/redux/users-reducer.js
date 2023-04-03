import { usersAPI } from '../components/api/api';
import { updateObjectInArray } from '../components/Common/utilities/objectHelper';

const FOLLOW = 'my-app/users/FOLLOW';
const UNFOLLOW = 'my-app/users/UNFOLLOW';
const SET_USERS = 'my-app/users/SET_USERS';
const SET_CURRENT_PAGE = 'my-app/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'my-app/users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'my-app/users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'my-app/users/TOGGLE_IS_FOLLOWING_IN_PROGRESS';

let initialState = {
  usersData: [],
  pageSize: 9,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
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
export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({
  type: UNFOLLOW,
  userId,
});
export const setUsers = (usersData) => ({ type: SET_USERS, usersData });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingInProgress = (isFetching, userId) => ({
  type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
  isFetching,
  userId,
});

//Thunk creator

export const getUsers = (currentPage, pageSize) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setCurrentPage(currentPage));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(toggleIsFetching(false));
  };
};

const followUnfollow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(toggleFollowingInProgress(true, userId));
  const data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingInProgress(false, userId));
};

export const follow = (userId) => {
  return async (dispatch) => {
    followUnfollow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
  };
};

export const unfollow = (userId) => {
  return async (dispatch) => {
    followUnfollow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
  };
};

export default usersReducer;

// {
//   id: 1,
//   name: 'Zhiroslav',
//   followed: true,
//   age: 26,
//   online: 1,
//   status: 'Hello!',
//   location: { country: 'Poland', city: 'Krakow' },
//   avatar: require(`../pictures/user_1.png`),
// },
// {
//   id: 2,
//   name: 'Prol',
//   followed: true,
//   age: 37,
//   online: 1,
//   status: 'Scratch here ▒▒▒▒▒ to reveal today’s status.',
//   location: { country: 'Russia', city: 'Moscow' },
//   avatar: require(`../pictures/user_2.png`),
// },
// {
//   id: 3,
//   name: 'Fyodor',
//   followed: false,
//   age: 31,
//   online: 0,
//   status: 'AAAAAAAAAAAA',
//   location: { country: 'Belorussia', city: 'Mogileu' },
//   avatar: require(`../pictures/user_3.png`),
// },
// {
//   id: 4,
//   name: 'Snezhana',
//   followed: true,
//   age: 33,
//   online: 1,
//   status: 'Back in 5 minutes. If not, read this status again',
//   location: { country: 'Kazakhstan', city: 'Karaganda' },
//   avatar: require(`../pictures/user_4.png`),
// },
// {
//   id: 5,
//   name: 'Balamut',
//   followed: false,
//   age: 23,
//   online: 0,
//   status: 'Working',
//   location: { country: 'Russia', city: 'Moscow' },
//   avatar: require(`../pictures/user_5.png`),
// },
// {
//   id: 6,
//   name: 'Alyona',
//   followed: false,
//   age: 41,
//   online: 1,
//   status: '',
//   location: { country: 'Ukraine', city: 'Kyev' },
//   avatar: require(`../pictures/user_6.png`),
// },
// {
//   id: 7,
//   name: 'Valera',
//   followed: true,
//   age: 29,
//   online: 1,
//   status: '',
//   location: { country: 'Tajikistan', city: 'Dushanbe' },
//   avatar: require(`../pictures/user_7.png`),
// },
