import React, { FC, useEffect } from 'react';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { Dispatch } from 'redux';
import { getUserProfile, getUserStatus } from '../../redux/profile-reducer';
import MyPostsMemorized from './MyPosts/MyPosts';

const Profile: FC = () => {
  let dispatch: Dispatch<any> = useDispatch();
  let params = useParams();
  let userId: null | number;
  typeof params.userId == undefined ? (userId = null) : (userId = Number(params.userId));

  let isOwner = !params.userId;

  let refreshProfile = () => {
    if (!userId) {
      userId = authorizedUserId;
    }
    dispatch(getUserProfile(userId));
    if (userId !== null) dispatch(getUserStatus(userId));
  };

  useEffect(() => {
    refreshProfile();
  }, [params.userId]);

  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const authorizedUserId = useSelector((state: AppStateType) => state.auth.id);

  if (!isAuth) return <Navigate to={'/login'} />;
  return (
    <div className={classes.profile}>
      <ProfileInfo />
      {isOwner ? <MyPostsMemorized /> : null}
    </div>
  );
};

export default Profile;
