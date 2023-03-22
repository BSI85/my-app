import React from 'react';
import Preloader from '../../Common/Preloader';
import classes from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  } else
    return (
      <div className={classes.profileInfo}>
        <div className={classes.avatar}>
          <img src={props.profile.photos.small} alt="avatar" />
        </div>
        <div className={classes.bio}>
          <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus} />
          <p className={classes.name}>Valera Zhiroslavsky</p>
          <p className={classes.detils}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt beatae iure neque accusantium aliquid
            aliquam eum labore, necessitatibus adipisci non, possimus quibusdam ab qui ipsum? Labore, iusto? Aspernatur
            sequi ea, sunt inventore consequuntur iste nisi, amet, accusamus repellendus cum excepturi!
          </p>
        </div>
      </div>
    );
};

export default ProfileInfo;
