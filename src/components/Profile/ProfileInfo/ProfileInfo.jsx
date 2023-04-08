import React from 'react';
import Preloader from '../../Common/Preloader';
import classes from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import userPhoto from '../../../pictures/default_avatar.png';

const ProfileInfo = (props) => {
  const onFileSelected = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      props.savePhoto(file);
    }
  };
  if (!props.profile) {
    return <Preloader />;
  } else
    return (
      <div className={classes.profileInfo}>
        <div className={classes.avatar}>
          {props.isOwner ? (
            <div className={classes.file_upload}>
              <img src={props.profile.photos.large || userPhoto} alt="avatar" />
              <h3> Click to change </h3>
              <input type="file" onChange={onFileSelected} />
            </div>
          ) : (
            <img src={props.profile.photos.large || userPhoto} alt="avatar" />
          )}
        </div>
        <div className={classes.bio}>
          <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus} isOwner={props.isOwner} />
          <p className={classes.name}>{props.profile.fullName}</p>
          <p className={classes.info}>
            <span>About me:</span> {props.profile.aboutMe}
          </p>
          {props.profile.lookingForAJob && (
            <p className={classes.info}>
              <span>Looking for a job:</span> {props.profile.lookingForAJobDescription}
            </p>
          )}
          <p className={classes.info}>
            <span>Contacts:</span>{' '}
            {
              // eslint-disable-next-line
              Object.keys(props.profile.contacts).map((key) => {
                if (props.profile.contacts[key])
                  return <Contact contactTitle={key} contactValue={props.profile.contacts[key]} />;
              })
            }
          </p>
        </div>
      </div>
    );
};

export const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={classes.contacts}>
      <span>{contactTitle}:</span> {contactValue}
    </div>
  );
};

export default ProfileInfo;
