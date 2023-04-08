import React from 'react';
import classes from './User.module.css';
import userPhoto from '../../../pictures/default_avatar.png';
import { NavLink } from 'react-router-dom';

const User = (props) => {
  return (
    <div className={classes.user__wrapper} key={props.user.id}>
      <div className={classes.user__header}>
        <div className={classes.status}>{props.user.status}</div>
        {props.user.online ? <div className={classes.online}>online</div> : <div className={classes.offline}></div>}
      </div>
      <div className={classes.main}>
        <div className={classes.ava}>
          <NavLink to={'/profile/' + props.user.id}>
            <img src={props.user.photos.small != null ? props.user.photos.small : userPhoto} alt="avatar" />
          </NavLink>
          {/* <img src={require(`../../../pictures/user_${props.user.id}.png`)} alt="avatar" /> */}
        </div>
        <div className={classes.info}>
          <div className={classes.name__age}>
            {props.user.name}, {props.user.age}
          </div>
          <div className={classes.country__city}>
            {'props.user.location.country'}, {'props.user.location.city'}
          </div>
          <div className={classes.button}>
            {props.user.followed ? (
              <button
                disabled={props.followingInProgress.some((id) => id === props.user.id)}
                onClick={() => {
                  props.unfollow(props.user.id);
                }}
              >
                Unfollow
              </button>
            ) : (
              <button
                disabled={props.followingInProgress.some((id) => id === props.user.id)}
                onClick={() => {
                  props.follow(props.user.id);
                }}
              >
                Follow
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
