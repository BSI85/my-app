import React, { FC } from 'react';
import classes from './Post.module.css';

type PropsType = {
  message: string;
  likesCount: number;
};

const Post: FC<PropsType> = (props) => {
  return (
    <div>
      <div className={classes.wrapper}>
        <div className={classes.img}>
          <img src={require('./icons8-customer-50.png')} alt="" />
        </div>
        <div className={classes.item}>{props.message}</div>
      </div>
      <div className={classes.like}>
        <button>Like {props.likesCount}</button>
      </div>
    </div>
  );
};

export default Post;
