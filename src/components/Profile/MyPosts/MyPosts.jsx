import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import Newpost from './Newpost/Newpost';

const MyPosts = () => {
  return (
    <div className={classes.myposts}>
      <Newpost />
      <Post message="Hi, how are you" likes="35" />
      <Post message="It's my first post" likes="28" />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default MyPosts;
