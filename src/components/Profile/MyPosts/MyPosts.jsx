import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import Newpost from './Newpost/Newpost';

const MyPosts = () => {
  let postsData = [
    { id: 1, post: 'Hi, how are you', likes: 35 },
    { id: 2, post: "It's my first post", likes: 28 },
    { id: 3, post: 'Hello!', likes: 5 },
  ];

  return (
    <div className={classes.myposts}>
      <Newpost />
      <Post message={postsData[0].post} likesCount={postsData[0].likes} />
      <Post message={postsData[1].post} likesCount={postsData[1].likes} />
      <Post message={postsData[2].post} likesCount={postsData[2].likes} />
      <Post />
    </div>
  );
};

export default MyPosts;
