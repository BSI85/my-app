import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './DialogItem.module.css';

const aIa = ({ isActive }) => (isActive ? classes.activeLink : classes.link);

const DialogItem = (props) => {
  let path = '/dialogs/' + props.id;
  return (
    <div className={classes.item}>
      <NavLink className={aIa} to={path}>
        {props.name}
      </NavLink>
    </div>
  );
};

export default DialogItem;
