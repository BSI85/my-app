import { connect } from 'react-redux';
import Users from './Users';
import {
  followCreator,
  unfollowCreator,
  setUsersCreator,
  setCurrentPageCreator,
  setTotalUsersCountCreator,
} from '../../redux/users-reducer';

let mapStateToProps = (state) => {
  return {
    usersData: state.usersPage.usersData,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followCreator(userId));
    },
    unfollow: (userId) => {
      dispatch(unfollowCreator(userId));
    },
    setUsers: (usersData) => {
      dispatch(setUsersCreator(usersData));
    },
    setCurrentPage: (pageNumber) => {
      dispatch(setCurrentPageCreator(pageNumber));
    },
    setTotalUsersCount: (totalCount) => {
      dispatch(setTotalUsersCountCreator(totalCount));
    },
  };
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;
