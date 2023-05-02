import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import { follow, unfollow, getUsers, FilterType } from '../../redux/users-reducer';
import Preloader from '../Common/Preloader';
import {
  getUsersData,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
  getFilter,
} from '../../redux/users-selectors';

import { compose } from 'redux';
import { UsersDataType } from '../types/UsersDataType';
import { AppStateType } from '../../redux/redux-store';

type MapStateToPropsType = {
  usersData: Array<UsersDataType>;
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  followingInProgress: Array<number>;
  isFetching: boolean;
  filter: FilterType;
};

type MapDispatchToPropsType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void;
};

type OwnPropsType = {
  pageTitle: string;
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize, this.props.filter);
  }
  onPageChange = (pageNumber: number) => {
    this.props.getUsers(pageNumber, this.props.pageSize, this.props.filter);
  };
  onSearchTerm = (filter: FilterType) => {
    this.props.getUsers(1, this.props.pageSize, filter);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          pageTitle={this.props.pageTitle}
          usersData={this.props.usersData}
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onSearchTerm={this.onSearchTerm}
          onPageChange={this.onPageChange}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    usersData: getUsersData(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getFilter(state),
  };
};

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    follow,
    unfollow,
    getUsers,
  })
)(UsersContainer);
