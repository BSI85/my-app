import React from 'react';
import classes from './Online.module.css';

const Online = (props) => {
  if (props.online)
    return (
      <div className={classes.ava}>
        <img src={require(`../../../pictures/user_${props.id}.png`)} alt="avatar" />
      </div>
    );
};

export default Online;
