import React, { ChangeEvent, FC } from 'react';
import Preloader from '../../Common/Preloader';
import classes from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import userPhoto from '../../../pictures/default_avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../../redux/Selectors/profile-selectors';
import { Dispatch } from 'redux';
import { useParams } from 'react-router-dom';
import { savePhoto } from '../../../redux/profile-reducer';

const ProfileInfo: FC = () => {
  type contactsKeyType = keyof typeof profile.contacts;

  let profile = useSelector(getProfile);
  let dispatch: Dispatch<any> = useDispatch();
  let params = useParams();
  let isOwner = !params.userId;

  const onFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      dispatch(savePhoto(file));
    }
  };
  if (!profile) {
    return <Preloader />;
  } else
    return (
      <div className={classes.profileInfo}>
        <div className={classes.avatar}>
          {isOwner ? (
            <div className={classes.file_upload}>
              <img src={profile.photos.large || userPhoto} alt="avatar" />
              <h3> Click to change </h3>
              <input type="file" onChange={onFileSelected} />
            </div>
          ) : (
            <img src={profile.photos.large || userPhoto} alt="avatar" />
          )}
        </div>
        <div className={classes.bio}>
          <ProfileStatus />
          <p className={classes.name}>{profile.fullName}</p>
          <p className={classes.info}>
            <span>About me:</span> {profile.aboutMe}
          </p>
          {profile.lookingForAJob && (
            <p className={classes.info}>
              <span>Looking for a job:</span> {profile.lookingForAJobDescription}
            </p>
          )}
          <div className={classes.info}>
            <span>Contacts:</span>{' '}
            {Object.keys(profile.contacts).map((keys, index) => {
              if (profile.contacts[keys as contactsKeyType])
                return (
                  <div className={classes.contacts} key={index}>
                    <span>{keys}:</span> {profile.contacts[keys as contactsKeyType]}
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    );
};

export default ProfileInfo;
