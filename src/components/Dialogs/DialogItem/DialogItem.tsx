import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './DialogItem.module.css';

const aIa = ({ isActive }: { isActive: boolean }) => (isActive ? classes.activeLink : classes.link);

type PropsType = {
  id: number;
  name: string;
};

const DialogItem: React.FC<PropsType> = (props) => {
  return (
    <div className={classes.item}>
      <NavLink className={aIa} to={'/dialogs/' + props.id}>
        {props.name}
      </NavLink>
    </div>
  );
};

export default DialogItem;
