import React from 'react';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../types/types';

type PropsType = {
  status: string;
  profile: ProfileType;
  isOwner: boolean;
  authorizedUserId: number | null;
  isAuth: boolean;
  savePhoto: (file: File | undefined) => void;
  updateUserStatus: (status: string) => void;
};

class Profile extends React.Component<PropsType> {
  render() {
    return (
      <div className={classes.profile}>
        <ProfileInfo
          savePhoto={this.props.savePhoto}
          isOwner={this.props.isOwner}
          profile={this.props.profile}
          status={this.props.status}
          updateUserStatus={this.props.updateUserStatus}
        />
        {this.props.isOwner ? <MyPostsContainer /> : null}
      </div>
    );
  }
}

export default Profile;
