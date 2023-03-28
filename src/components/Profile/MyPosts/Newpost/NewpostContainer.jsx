import { addPost } from '../../../../redux/profile-reducer';
import Newpost from './Newpost';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return { newPostText: state.profilePage.newPostText };
};

const NewpostContainer = connect(mapStateToProps, { addPost })(Newpost);

export default NewpostContainer;
