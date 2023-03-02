const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';

let initialState = {
  usersData: [],
  pageSize: 9,
  totalUsersCount: 0,
  currentPage: 1,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        usersData: state.usersData.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        usersData: state.usersData.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
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

    default:
      return state;
  }
};

//Action creators:
export const followCreator = (userId) => ({ type: FOLLOW, userId });
export const unfollowCreator = (userId) => ({
  type: UNFOLLOW,
  userId,
});
export const setUsersCreator = (usersData) => ({ type: SET_USERS, usersData });
export const setCurrentPageCreator = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCountCreator = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });

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
