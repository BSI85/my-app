import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src={require('../../pictures/Logo.png')} alt="" />
      </div>

      <div className={classes.login__block}>
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={props.logOut}>Log out</button>
          </div>
        ) : (
          <NavLink to={'/login'}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
