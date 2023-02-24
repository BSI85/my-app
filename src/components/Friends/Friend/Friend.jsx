import React from 'react';
import classes from './Friend.module.css';

const Friend = (props) => {
  let isOnline = () => (props.online ? 'online' : '');

  return (
    <div className={classes.friend__wrapper}>
      <div className={classes.online}>{isOnline()}</div>
      <div className={classes.ava}>
        <img src={require(`../../../pictures/user_${props.id}.png`)} alt="avatar" />
      </div>
      <div className={classes.name__age}>
        {props.name}, {props.age}
      </div>
    </div>
  );
};

export default Friend;
