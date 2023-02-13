import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
  return (
    <div>
      <div className={classes.wrapper}>
        <div className={classes.img}>
          <img src={require('./icons8-customer-50.png')} alt="" />
        </div>
        <div className={classes.item}>{props.message}</div>
      </div>
      <div className={classes.like}>
        <button>Like ({props.likes})</button>
      </div>
    </div>
  );
};

export default Post;
