import React, { Dispatch, FC, useEffect } from 'react';
import classes from './Users.module.css';
import Paginator from '../Common/Paginator/Paginator';
import User from './User/User';
import UserSearchForm from './UserSearchForm/UserSearchForm';
import { FilterType, getUsers, follow, unfollow } from '../../redux/users-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  getCurrentPage,
  getFilter,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsersData,
} from '../../redux/Selectors/users-selectors';
import Preloader from '../Common/Preloader';

type PropsType = {};

const Users: FC<PropsType> = () => {
  const usersData = useSelector(getUsersData);
  const pageSize = useSelector(getPageSize);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const followingInProgress = useSelector(getFollowingInProgress);
  const filter = useSelector(getFilter);
  const isFetching = useSelector(getIsFetching);

  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate(`/users?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`);
  }, [currentPage, pageSize, filter]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    let actualPage = currentPage;
    let actualFilter = filter;

    const queryFriend = query.get('friend');
    const queryPage = query.get('page');
    const queryTerm = query.get('term');

    if (queryPage) actualPage = +queryPage;

    if (queryTerm) actualFilter = { ...actualFilter, term: queryTerm };

    switch (queryFriend) {
      case 'null':
        actualFilter = { ...actualFilter, friend: null };

        break;
      case 'true':
        actualFilter = { ...actualFilter, friend: true };
        break;
      case 'false':
        actualFilter = { ...actualFilter, friend: false };
        break;
      default:
        break;
    }
    dispatch(getUsers(actualPage, pageSize, actualFilter));
  }, [location.search]);

  // useEffect(() => {
  //   dispatch(getUsers(currentPage, pageSize, filter));
  // }, []);

  const onPageChange = (pageNumber: number) => {
    dispatch(getUsers(pageNumber, pageSize, filter));
  };
  const onSearchTerm = (filter: FilterType) => {
    dispatch(getUsers(1, pageSize, filter));
  };

  const followF = (userId: number) => {
    dispatch(follow(userId));
  };

  const unfollowF = (userId: number) => {
    dispatch(unfollow(userId));
  };

  return (
    <div>
      {isFetching ? (
        <Preloader />
      ) : (
        <div className={classes.users__wrapper}>
          <div className={classes.users__header}>
            <div>Users</div>
            <div className={classes.paginator_search_container}>
              <Paginator
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={onPageChange}
              />
              <div className={classes.users__search_form}>
                <UserSearchForm onSearchTerm={onSearchTerm} />
              </div>
            </div>
          </div>
          <div className={classes.users__items}>
            {usersData.map((u) => (
              <User
                user={u}
                key={u.id}
                followingInProgress={followingInProgress}
                follow={followF}
                unfollow={unfollowF}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;

// useEffect(() => {
//   const query = new URLSearchParams(location.search);

//   let actualPage = currentPage;
//   let actualFilter = filter;

//   const queryFriend = query.get('friend');
//   const queryPage = query.get('page');
//   const queryTerm = query.get('term');

//   if (queryPage) actualPage = +queryPage;

//   if (queryTerm) actualFilter = { ...actualFilter, term: queryTerm };

//   switch (queryFriend) {
//     case 'null':
//       actualFilter = { ...actualFilter, friend: null };

//       break;
//     case 'true':
//       actualFilter = { ...actualFilter, friend: true };
//       break;
//     case 'false':
//       actualFilter = { ...actualFilter, friend: false };
//       break;
//     default:
//       break;
//   }
//   dispatch(getUsers(actualPage, pageSize, actualFilter));
// }, [location.search]);
