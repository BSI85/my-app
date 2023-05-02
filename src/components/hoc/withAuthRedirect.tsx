import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppStateType } from '../../redux/redux-store';

let mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

type AuthPropsType = {
  isAuth: boolean;
};

export function withAuthRedirect(Component: React.ComponentType<AuthPropsType>) {
  let RedirectComponent: React.FC<AuthPropsType> = (props) => {
    if (!props.isAuth) return <Navigate to={'/login'} />;
    return <Component {...props} />;
  };
  let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
  return ConnectedAuthRedirectComponent;
}
