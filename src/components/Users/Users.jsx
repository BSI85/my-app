import React from 'react';
import classes from './Users.module.css';
import Paginator from '../Common/Paginator/Paginator';
import User from './User/User';

let Users = (props) => {
  // let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  // let pages = [];
  // for (let i = 1; i < pagesCount; i++) {
  //   pages.push(i);
  // }
  // let curPage = props.currentPage;
  // let resultPages = [];
  // if (curPage < 5) {
  //   resultPages = [1, 2, 3, 4, 5, '...', pagesCount];
  // } else if (curPage < pagesCount - 3) {
  //   resultPages = [1, '...', ...pages.slice(curPage - 3, curPage + 2), '...', pagesCount];
  // } else {
  //   resultPages = [1, '...', pagesCount - 4, pagesCount - 3, pagesCount - 2, pagesCount - 1, pagesCount];
  // }

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
