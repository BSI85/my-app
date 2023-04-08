import React from 'react';
import classes from './Users.module.css';
import Paginator from '../Common/Paginator/Paginator';
import User from './User/User';

let Users = (props) => {
  return (
    <div className={classes.users__wrapper}>
      <div className={classes.users__header}>Users</div>
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
