import { addPost } from '../../../../redux/profile-reducer';
import { AppStateType } from '../../../../redux/redux-store';
import Newpost from './Newpost';
import { connect } from 'react-redux';

type MapDispatchToPropsType = {
  addPost: (addNewPost: string) => void;
};

const NewpostContainer = connect<null, MapDispatchToPropsType, null, AppStateType>(null, { addPost })(Newpost);

export default NewpostContainer;
