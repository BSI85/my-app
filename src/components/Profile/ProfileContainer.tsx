import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile, getUserStatus, updateUserStatus, savePhoto } from '../../redux/profile-reducer';
import { Navigate, useParams } from 'react-router-dom';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux';
import { ProfileType } from '../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStateToPropsType = {
  status: string;
  profile: ProfileType;
  authorizedUserId: number | null;
  isAuth: boolean;
};
type MapDispatchToPropsType = {
  updateUserStatus: (status: string) => void;
  getUserProfile: (userId: number) => void;
  getUserStatus: (userId: number) => void;
  savePhoto: (file: File | undefined) => void;
};

type LocalPropsType = {
  match: any; //ANY ANY ANY******************************
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType & LocalPropsType;

class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
    }
    this.props.getUserProfile(userId);
    this.props.getUserStatus(userId);
  }
  componentDidMount() {
    this.refreshProfile();
  }
  componentDidUpdate(prevProps: PropsType) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) this.refreshProfile();
  }

  render() {
    if (!this.props.isAuth) return <Navigate to={'/login'} />;
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
        savePhoto={this.props.savePhoto}
      />
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth,
});

export function withRouter(Children: any) {
  //ANY ANY ANY******************************
  return (props: PropsType) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStateType>(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
