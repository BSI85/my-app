import React from 'react';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src={require('../../pictures/62c68a00b8203_json_image_1657178624.webp')} alt="" />
      </div>
    </header>
  );
};

export default Header;
