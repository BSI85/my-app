import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';

class Navbar extends React.Component {
  aIa = ({ isActive }: { isActive: boolean }) => (isActive ? classes.activeLink : classes.item);

  render() {
    return (
      <nav className={classes.navbar}>
        <div className={classes.item_box}>
          <NavLink to="/profile" className={this.aIa}>
            Profile
          </NavLink>
        </div>
        <div className={classes.item_box}>
          <NavLink to="/users" className={this.aIa}>
            Users
          </NavLink>
        </div>
        <div className={classes.item_box}>
          <NavLink to="/dialogs" className={this.aIa}>
            Messages
          </NavLink>
        </div>
        <div className={classes.item_box}>
          <NavLink to="/news" className={this.aIa}>
            News
          </NavLink>
        </div>
        <div className={classes.item_box}>
          <NavLink to="/music" className={this.aIa}>
            Music
          </NavLink>
        </div>
        <div className={classes.item_box}>
          <NavLink to="/settings" className={this.aIa}>
            Settings
          </NavLink>
        </div>
      </nav>
    );
  }
}

export default Navbar;
