import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';
const aIa = ({ isActive }) => (isActive ? classes.activeLink : classes.item);

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.item_box}>
        <NavLink to="/profile" className={aIa}>
          Profile
        </NavLink>
      </div>
      <div className={classes.item_box}>
        <NavLink to="/dialogs" className={aIa}>
          Messages
        </NavLink>
      </div>
      <div className={classes.item_box}>
        <NavLink to="/news" className={aIa}>
          News
        </NavLink>
      </div>
      <div className={classes.item_box}>
        <NavLink to="/music" className={aIa}>
          Music
        </NavLink>
      </div>
      <div className={classes.item_box}>
        <NavLink to="/settings" className={aIa}>
          Settings
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
