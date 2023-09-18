import React, { FC, useEffect } from 'react';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { Navigate, useParams } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Dispatch, compose } from 'redux';
import { getUserProfile, getUserStatus } from '../../redux/profile-reducer';
import MyPostsMemorized from './MyPosts/MyPosts';
import { getAuthorizedUserId, getIsAuth } from '../../redux/Selectors/auth-selectors';
import { withAuthRedirect } from '../hoc/withAuthRedirect';

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

  const isAuth = useSelector(getIsAuth);
  const authorizedUserId = useSelector(getAuthorizedUserId);

  if (!isAuth) return <Navigate to={'/login'} />;
  return (
    <div className={classes.profile}>
      <ProfileInfo />
      {isOwner ? <MyPostsMemorized /> : null}
    </div>
  );
};

export default compose<any>(connect(null, {}), withAuthRedirect)(Profile);
