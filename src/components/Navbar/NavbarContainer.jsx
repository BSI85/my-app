import { connect } from 'react-redux';
import Navbar from './Navbar';

let mapStateToProps = (state) => {
  return {
    usersData: state.usersPage.usersData,
  };
};

const NavbarContainer = connect(mapStateToProps, null)(Navbar);

export default NavbarContainer;
