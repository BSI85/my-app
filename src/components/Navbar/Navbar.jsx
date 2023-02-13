import React from 'react';
import classes from './Navbar.module.css';
console.log(classes);

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.item}>
        <a href="#">Profile</a>
      </div>
      <div className={`${classes.item} ${classes.active}`}>
        <a href="#">Messages</a>
      </div>
      <div className={classes.active}>
        <a href="#">News</a>
      </div>
      <div className={classes.item}>
        <a href="#">Music</a>
      </div>
      <div className={classes.item}>
        <a href="#">Setting</a>
      </div>
    </nav>
  );
};

export default Navbar;
