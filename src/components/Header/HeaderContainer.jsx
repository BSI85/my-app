import Header from './Header';
import { connect } from 'react-redux';
import { logOut } from '../../redux/auth-reduser';

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

const HeaderContainer = connect(mapStateToProps, { logOut })(Header);
export default HeaderContainer;
