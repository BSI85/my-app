import React, { FC } from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import NewpostContainer from './Newpost/NewpostContainer';
import { PostsDataType } from '../../types/types';

type MapStateToPropsType = {
  postsData: Array<PostsDataType>;
};

const MyPosts: FC<MapStateToPropsType> = (props) => {
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
