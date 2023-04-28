import React, { FC } from 'react';
import classes from './Users.module.css';
import Paginator from '../Common/Paginator/Paginator';
import User from './User/User';
import { UsersDataType } from '../types/UsersDataType';

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
};

let Users: FC<PropsType> = (props) => {
  return (
    <div className={classes.users__wrapper}>
      <div className={classes.users__header}>{props.pageTitle}</div>
      <Paginator
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onPageChange={props.onPageChange}
      />
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

//import User from './User/User';
// let usersElement = props.usersData.map((f) => (
//   <User
//     key={f.id}
//     id={f.id}
//     name={f.name}
//     age={f.age}
//     online={f.online}
//     followed={f.followed}
//     status={f.status}
//     country={f.location.country}
//     city={f.location.city}
//     avatar={f.avatar}
//   />
// ));
