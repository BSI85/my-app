import React from 'react';
import classes from './Users.module.css';
import userPhoto from '../../pictures/default_avatar.png';
import { NavLink } from 'react-router-dom';
import { usersAPI } from '../api/api';

let Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i < pagesCount; i++) {
    pages.push(i);
  }
  let curPage = props.currentPage;
  let resultPages = [];
  if (curPage < 5) {
    resultPages = [1, 2, 3, 4, 5, '...', pagesCount];
  } else if (curPage < pagesCount - 3) {
    resultPages = [1, '...', ...pages.slice(curPage - 3, curPage + 2), '...', pagesCount];
  } else {
    resultPages = [1, '...', pagesCount - 4, pagesCount - 3, pagesCount - 2, pagesCount - 1, pagesCount];
  }

  return (
    <div className={classes.users__wrapper}>
      <div className={classes.users__header}>Users</div>
      <div className={classes.users__pages}>
        {resultPages.map((p) => {
          if (typeof p === 'number') {
            return (
              <span
                className={curPage === p ? classes.selectedPage : undefined}
                onClick={(e) => {
                  props.onPageChange(p);
                }}
              >
                {p}
              </span>
            );
          } else {
            return <span>{p}</span>;
          }
        })}
      </div>
      <div className={classes.users__items}>
        {props.usersData.map((u) => (
          <div className={classes.user__wrapper} key={u.id}>
            <div className={classes.user__header}>
              <div className={classes.status}>{u.status}</div>
              {u.online ? <div className={classes.online}>online</div> : <div className={classes.offline}></div>}
            </div>
            <div className={classes.ava}>
              <NavLink to={'/profile/' + u.id}>
                <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="avatar" />
              </NavLink>
              {/* <img src={require(`../../../pictures/user_${u.id}.png`)} alt="avatar" /> */}
            </div>
            <div className={classes.bottom}>
              <div>
                <div className={classes.name__age}>
                  {u.name}, {u.age}
                </div>
                <div className={classes.country__city}>
                  {'u.location.country'}, {'u.location.city'}
                </div>
              </div>
              <div className={classes.button}>
                {u.followed ? (
                  <button
                    disabled={props.followingInProgress.some((id) => id === u.id)}
                    onClick={() => {
                      props.unfollow(u.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    disabled={props.followingInProgress.some((id) => id === u.id)}
                    onClick={() => {
                      props.follow(u.id);
                    }}
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
          </div>
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
