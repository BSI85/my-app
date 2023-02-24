import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import Newpost from './Newpost/Newpost';

const MyPosts = (props) => {
  let postsElements = props.state.postsData.map((p) => <Post message={p.post} likesCount={p.likes} />);
  return (
    <div className={classes.myposts}>
      <Newpost state={props.state} dispatch={props.dispatch} />
      {postsElements}
    </div>
  );
};

export default MyPosts;
