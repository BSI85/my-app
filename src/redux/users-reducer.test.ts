import { UsersDataType } from '../components/types/UsersDataType';
import usersReducer, { InitialStateType, follow, unfollow, userActions } from './users-reducer';

import { usersAPI } from '../components/api/usersAPI';
import { DefaultResponseType, ResultCodeEnum } from '../components/types/types';
jest.mock('../components/api/usersAPI');
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
let result: DefaultResponseType = {
  resultCode: ResultCodeEnum.success,
  messages: ['testttt'],
  data: {},
};

let state: InitialStateType;
beforeEach(() => {
  state = {
    usersData: [
      {
        id: 0,
        name: 'Vasya',
        status: 'status0',
        photos: {
          small: null,
          large: null,
        },
        followed: false,
      },
      {
        id: 1,
        name: 'Vasya1',
        status: 'status1',
        photos: {
          small: null,
          large: null,
        },
        followed: false,
      },
      {
        id: 2,
        name: 'Vasya2',
        status: 'status2',
        photos: {
          small: null,
          large: null,
        },
        followed: true,
      },
      {
        id: 3,
        name: 'Vasya3',
        status: 'status3',
        photos: {
          small: null,
          large: null,
        },
        followed: true,
      },
    ] as Array<UsersDataType>,
    pageSize: 15,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as number[],
  };
});

test('follow success', () => {
  const newState = usersReducer(state, userActions.followSuccess(1));
  expect(newState.usersData[0].followed).toBeFalsy;
  expect(newState.usersData[1].followed).toBeTruthy;
});

test('unfollow success', () => {
  const newState = usersReducer(state, userActions.unfollowSuccess(2));
  expect(newState.usersData[2].followed).toBeFalsy;
  expect(newState.usersData[3].followed).toBeTruthy;
});

test('follow thunk success', async () => {
  usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
  const thunk = follow(1);
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, userActions.toggleFollowingInProgress(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, userActions.followSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, userActions.toggleFollowingInProgress(false, 1));
});

test('unfollow thunk success', async () => {
  usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));
  const thunk = unfollow(3);
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, userActions.toggleFollowingInProgress(true, 3));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, userActions.unfollowSuccess(3));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, userActions.toggleFollowingInProgress(false, 3));
});
