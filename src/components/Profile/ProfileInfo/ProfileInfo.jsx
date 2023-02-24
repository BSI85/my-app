import React from 'react';
import classes from './ProfileInfo.module.css';

const ProfileInfo = () => {
  return (
    <div className={classes.profileInfo}>
      <div className={classes.avatar}>
        <img src={require('../../../pictures/user_7.png')} alt="avatar" />
      </div>
      <div className={classes.bio}>
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