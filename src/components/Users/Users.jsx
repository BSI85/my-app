import axios from 'axios';
import React from 'react';
import classes from './Users.module.css';
import userPhoto from '../../pictures/default_avatar.png';

class Users extends React.Component {
  componentDidMount() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  }
  onPageChange = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
      .then((response) => {
        this.props.setUsers(response.data.items);
      });
  };

  render() {
    let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
    let pages = [];
    for (let i = 1; i < pagesCount; i++) {
      pages.push(i);
    }

    let curPage = this.props.currentPage;
    let curPageS = curPage < 5 ? 0 : curPage - 5;
    let curPageE = curPage + 4;
    let slicedPages = pages.slice(curPageS, curPageE);

    return (
      <div className={classes.users__wrapper}>
        <div className={classes.users__header}>Users</div>
        <div className={classes.users__pages}>
          {slicedPages.map((p) => {
            return (
              <span
                className={this.props.currentPage === p && classes.selectedPage}
                onClick={(e) => {
                  this.onPageChange(p);
                }}
              >
                {p}
              </span>
            );
          })}
        </div>
        <div className={classes.users__items}>
          {this.props.usersData
            .map((u) => (
              <div className={classes.user__wrapper} key={u.id}>
                <div className={classes.user__header}>
                  <div className={classes.status}>{u.status}</div>
                  {u.online ? <div className={classes.online}>online</div> : <div className={classes.offline}></div>}
                </div>
                <div className={classes.ava}>
                  <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="avatar" />
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
                        onClick={() => {
                          this.props.unfollow(u.id);
                        }}
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          this.props.follow(u.id);
                        }}
                      >
                        Follow
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
            .reverse()}
        </div>
      </div>
    );
  }
}

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
