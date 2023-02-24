import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';
import Online from './Online/Online';
const aIa = ({ isActive }) => (isActive ? classes.activeLink : classes.item);

const Navbar = (props) => {
  let onlineFriends = props.state.friendsData.map((f) => <Online id={f.id} name={f.name} online={f.online} />);

  return (
    <nav className={classes.navbar}>
      <div className={classes.item_box}>
        <NavLink to="/profile" className={aIa}>
          Profile
        </NavLink>
      </div>
      <div className={classes.item_box}>
        <NavLink to="/friends" className={aIa}>
          Friends
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
      <div className={classes.item_box}>
        Online
        <div className={classes.online__wrapper}>{onlineFriends}</div>
      </div>
    </nav>
  );
};

export default Navbar;
