import React, { FC } from 'react';
import classes from './MyPosts.module.css';
import Newpost from './Newpost/Newpost';
import { useSelector } from 'react-redux';
import { getPostsData } from '../../../redux/Selectors/profile-selectors';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const MyPosts: FC = () => {
  let postsData = useSelector(getPostsData);

  return (
    <div className={classes.myposts}>
      <Newpost />
      {postsData.map((p) => (
        <Post key={p.id} message={p.post} likesCount={p.likes} />
      ))}
    </div>
  );
};

type PropsType = {
  message: string;
  likesCount: number;
};

const Post: FC<PropsType> = (props) => {
  return (
    <div>
      <div className={classes.wrapper}>
        <div className={classes.img}>
          <Avatar size={48} icon={<UserOutlined />} />
        </div>
        <div className={classes.item}>{props.message}</div>
      </div>
      <div className={classes.like}>
        <button>Like {props.likesCount}</button>
      </div>
    </div>
  );
};

const MyPostsMemorized = React.memo(MyPosts);

export default MyPostsMemorized;
