import { connect } from 'react-redux';
import MyPosts from './MyPosts';
import { AppStateType } from '../../../redux/redux-store';
import { PostsDataType } from '../../types/types';

type MapStateToPropsType = {
  postsData: Array<PostsDataType>;
};

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    postsData: state.profilePage.postsData,
  };
};

const MyPostsContainer = connect(mapStateToProps, null)(MyPosts);

export default MyPostsContainer;
