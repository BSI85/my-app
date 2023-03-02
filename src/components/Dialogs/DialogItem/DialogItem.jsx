import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './DialogItem.module.css';

const aIa = ({ isActive }) => (isActive ? classes.activeLink : classes.link);

class DialogItem extends React.Component {
  render() {
    return (
      <div className={classes.item}>
        <NavLink className={aIa} to={'/dialogs/' + this.props.id}>
          {this.props.name}
        </NavLink>
      </div>
    );
  }
}

export default DialogItem;
