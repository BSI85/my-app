import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile, getUserStatus, updateUserStatus, savePhoto } from '../../redux/profile-reducer';
import { Navigate, useParams } from 'react-router-dom';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
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
  componentDidUpdate(prevProps) {
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

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

export default compose(
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, savePhoto }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
