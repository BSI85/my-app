import React, { FC } from 'react';
import classes from './Users.module.css';
import Paginator from '../Common/Paginator/Paginator';
import User from './User/User';
import { UsersDataType } from '../types/UsersDataType';
import UserSearchForm from '../Common/UserSearchForm/UserSearchForm';
import { FilterType } from '../../redux/users-reducer';

type PropsType = {
  usersData: Array<UsersDataType>;
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  pageTitle: string;
  onPageChange: (p: number) => void;
  followingInProgress: Array<number>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  onSearchTerm: (filter: FilterType) => void;
};

let Users: FC<PropsType> = (props) => {
  return (
    <div className={classes.users__wrapper}>
      <div className={classes.users__header}>
        <div>{props.pageTitle}</div>
        <div className={classes.paginator_search_container}>
          <Paginator
            totalUsersCount={props.totalUsersCount}
            pageSize={props.pageSize}
            currentPage={props.currentPage}
            onPageChange={props.onPageChange}
          />
          <div className={classes.users__search_form}>
            <UserSearchForm onSearchTerm={props.onSearchTerm} />
          </div>
        </div>
      </div>
      <div className={classes.users__items}>
        {props.usersData.map((u) => (
          <User
            user={u}
            key={u.id}
            followingInProgress={props.followingInProgress}
            follow={props.follow}
            unfollow={props.unfollow}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
