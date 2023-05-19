import React, { ChangeEvent, FC } from 'react';
import Preloader from '../../Common/Preloader';
import classes from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import userPhoto from '../../../pictures/default_avatar.png';
import { ProfileType } from '../../types/ProfileType';

type MapStateToPropsType = {
  status: string;
  profile: ProfileType;
  isOwner: boolean;
};
type MapDispatchToPropsType = {
  updateUserStatus: (status: string) => void;

  savePhoto: (file: File) => void;
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const ProfileInfo: FC<PropsType> = (props) => {
  type contactsKeyType = keyof typeof props.profile.contacts;
  const onFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
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
          <div className={classes.info}>
            <span>Contacts:</span>{' '}
            {Object.keys(props.profile.contacts).map((keys) => {
              if (props.profile.contacts[keys as contactsKeyType])
                return (
                  <Contact
                    contactTitle={keys}
                    contactValue={props.profile.contacts[keys as contactsKeyType]}
                    key={keys}
                  />
                );
            })}
          </div>
        </div>
      </div>
    );
};

type PropsTypeContact = {
  contactTitle: string;
  contactValue: string;
  key: string;
};

export const Contact: FC<PropsTypeContact> = (props) => {
  return (
    <div className={classes.contacts} key={props.key}>
      <span>{props.contactTitle}:</span> {props.contactValue}
    </div>
  );
};

export default ProfileInfo;
