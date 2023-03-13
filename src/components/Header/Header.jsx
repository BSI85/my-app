import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src={require('../../pictures/62c68a00b8203_json_image_1657178624.webp')} alt="" />
      </div>

      <div className={classes.login__block}>{props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink>}</div>
    </header>
  );
};

export default Header;
