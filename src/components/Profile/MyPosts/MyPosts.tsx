import React, { FC } from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { PostsDataType } from '../../types/ProfileType';
import Newpost from './Newpost/Newpost';

type MapStateToPropsType = {
  postsData: Array<PostsDataType>;
};

const MyPosts: FC<MapStateToPropsType> = (props) => {
  return (
    <div className={classes.myposts}>
      <Newpost />
      {props.postsData.map((p) => (
        <Post key={p.id} message={p.post} likesCount={p.likes} />
      ))}
    </div>
  );
};

const MyPostsMemorized = React.memo(MyPosts);

export default MyPostsMemorized;
