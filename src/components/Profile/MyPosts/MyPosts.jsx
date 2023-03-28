import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import NewpostContainer from './Newpost/NewpostContainer';

const MyPosts = (props) => {
  return (
    <div className={classes.myposts}>
      <NewpostContainer />
      {props.postsData.map((p) => (
        <Post key={p.id} message={p.post} likesCount={p.likes} />
      ))}
    </div>
  );
};

export default MyPosts;
