import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import { PostsDataType } from '../../types/ProfileType';
import MyPostsMemorized from './MyPosts';

type MapStateToPropsType = {
  postsData: Array<PostsDataType>;
};

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    postsData: state.profilePage.postsData,
  };
};

const MyPostsContainer = connect(mapStateToProps, null)(MyPostsMemorized);

export default MyPostsContainer;
