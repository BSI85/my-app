import React, { Dispatch } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './HeaderLogin.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { logOut } from '../../redux/auth-reduser';
import { Avatar } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const HeaderLogin: React.FC = () => {
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const login = useSelector((state: AppStateType) => state.auth.login);
  const dispatch: Dispatch<any> = useDispatch();
  const logOutMe = () => {
    dispatch(logOut());
  };

  return (
    <div style={{ padding: 2 }}>
      {isAuth ? (
        <div className={classes.login__block}>
          <Avatar style={{ backgroundColor: '#6394ed' }} size={58}>
            {login?.slice(0, 2).toUpperCase()}
          </Avatar>
          <LogoutOutlined onClick={logOutMe} className={classes.logout} />
        </div>
      ) : (
        <NavLink to={'/login'}>Login</NavLink>
      )}
    </div>
  );
};

export default HeaderLogin;
