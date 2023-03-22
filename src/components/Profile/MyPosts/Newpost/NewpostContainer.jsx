import { addPostCreator } from '../../../../redux/profile-reducer';
import Newpost from './Newpost';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return { newPostText: state.profilePage.newPostText };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (addNewPost) => {
      dispatch(addPostCreator(addNewPost));
    },
  };
};

const NewpostContainer = connect(mapStateToProps, mapDispatchToProps)(Newpost);

export default NewpostContainer;
