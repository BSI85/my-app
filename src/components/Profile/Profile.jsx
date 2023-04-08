import React from 'react';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

class Profile extends React.Component {
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
        <MyPostsContainer />
      </div>
    );
  }
}

export default Profile;
