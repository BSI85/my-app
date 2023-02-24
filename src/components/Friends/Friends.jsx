import React from 'react';
import Friend from './Friend/Friend';
import classes from './Friends.module.css';

const Friends = (props) => {
  let friendsElement = props.state.friendsData.map((f) => (
    <Friend id={f.id} name={f.name} age={f.age} online={f.online} />
  ));
  return (
    <div className={classes.friends__wrapper}>
      <div className={classes.friends__header}>Friends</div>
      <div className={classes.friends__items}>{friendsElement}</div>
    </div>
  );
};

export default Friends;
