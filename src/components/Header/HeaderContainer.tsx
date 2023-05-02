import Header from './Header';
import { connect } from 'react-redux';
import { logOut } from '../../redux/auth-reduser';
import { AppStateType } from '../../redux/redux-store';

type MapStateToPropsType = {
  isAuth: boolean;
  login: string | null;
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

const HeaderContainer = connect(mapStateToProps, { logOut })(Header);
export default HeaderContainer;
