import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './DialogItem.module.css';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const aIa = ({ isActive }: { isActive: boolean }) => (isActive ? classes.activeLink : classes.link);

type PropsType = {
  id: number;
  name: string;
  avatar: string | null;
};

const DialogItem: React.FC<PropsType> = (props) => {
  return (
    <div className={classes.item}>
      <NavLink className={aIa} to={'/dialogs/' + props.id}>
        <div>
          <Avatar size={60} className={classes.avatar} src={props.avatar} icon={<UserOutlined />} />
          <span className={classes.name}>{props.name}</span>
        </div>
      </NavLink>
    </div>
  );
};

export default DialogItem;
