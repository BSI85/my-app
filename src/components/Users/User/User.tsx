import React, { FC } from 'react';
import classes from './User.module.css';
import userPhoto from '../../../pictures/default_avatar.png';
import { NavLink } from 'react-router-dom';
import { UsersDataType } from '../../types/UsersDataType';
import { Button } from 'antd';
import { SendOutlined, UserAddOutlined } from '@ant-design/icons';

type PropsType = {
  user: UsersDataType;
  followingInProgress: Array<number>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  addUserToDialogs: (id: number) => void;
};

const User: FC<PropsType> = (props) => {
  return (
    <div className={classes.user__wrapper} key={props.user.id}>
      <div className={classes.user__header}>
        <div className={classes.status}>{props.user.status}</div>
        {/* {props.user.online ? <div className={classes.online}>online</div> :  */}
        <div className={classes.offline}></div>
      </div>
      <div className={classes.main}>
        <div className={classes.ava}>
          <NavLink to={'/profile/' + props.user.id}>
            <img src={props.user.photos.small != null ? props.user.photos.small : userPhoto} alt="avatar" />
          </NavLink>
        </div>
        <div className={classes.info}>
          <div className={classes.name__age}>{props.user.name}</div>
          <div className={classes.button_wrapper}>
            {props.user.followed ? (
              <Button
                icon={<UserAddOutlined />}
                className={classes.button_FuF}
                loading={props.followingInProgress.some((id) => id === props.user.id)}
                disabled={props.followingInProgress.some((id) => id === props.user.id)}
                onClick={() => {
                  props.unfollow(props.user.id);
                }}
                size="small"
              >
                Unfollow
              </Button>
            ) : (
              <Button
                icon={<UserAddOutlined />}
                className={classes.button_FuF}
                loading={props.followingInProgress.some((id) => id === props.user.id)}
                disabled={props.followingInProgress.some((id) => id === props.user.id)}
                onClick={() => {
                  props.follow(props.user.id);
                }}
                size="small"
              >
                Follow
              </Button>
            )}
            <Button
              className={classes.button_FuF}
              onClick={() => {
                props.addUserToDialogs(props.user.id);
              }}
              size="small"
              icon={<SendOutlined />}
            >
              Send
            </Button>
          </div>

          <div className={classes.button_wrapper}></div>
        </div>
      </div>
    </div>
  );
};

export default User;
