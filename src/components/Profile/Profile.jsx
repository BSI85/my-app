import React from 'react';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={classes.profile}>
        <ProfileInfo />
        <MyPostsContainer />
      </div>
    );
  }
}

export default Profile;
